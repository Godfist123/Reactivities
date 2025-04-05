import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IActivity } from "../../Domain/Activity";
import { useAxios } from "../Agent/useAxios";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../Utils/GetCurrentUser";
import { Profile } from "../../Domain/Profile";
import { PagedList } from "../../Domain/PagedList";
import { useUIContext } from "../stores/store";

export const useActivityList = (id?: string) => {
  const reactQueryclient = useQueryClient();
  const agent = useAxios();
  const location = useLocation();
  const {
    activityStoreInstance: { filter, startDate },
  } = useUIContext();

  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PagedList<IActivity, string>>({
    queryKey: ["activities", filter, startDate],
    queryFn: async ({ pageParam = null }) => {
      try {
        const resp = await agent.get<PagedList<IActivity, string>>(
          "/activities",
          {
            params: {
              cursor: pageParam,
              pageSize: 5,
              filter,
              startDate,
            },
          }
        );
        return resp.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    placeholderData: keepPreviousData,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !id && location.pathname === "/activities",
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) => ({
        ...page,
        items: page.items.map((x) => ({
          ...x,
          isHost: x.hostId === getCurrentUser()?.sub,
          isGoing: x.attendees.some((x) => x.id === getCurrentUser()?.sub),
          hostImageUrl: x.attendees.find((user) => user.id === x.hostId)
            ?.imageUrl,
        })),
      })),
    }),
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const resp = await agent.get<IActivity>(`/activities/${id}`);
      return resp.data;
    },
    enabled: !!id,
    select: (data) => {
      return {
        ...data,
        isHost: data.hostId === getCurrentUser()?.sub,
        isGoing: data.attendees.some((x) => x.id === getCurrentUser()?.sub),
        hostImageUrl: data.attendees.find((user) => user.id === data.hostId)
          ?.imageUrl,
      };
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: IActivity) => {
      try {
        if (activity.id) {
          console.log("update", activity);
          console.log("updateid", activity.id);
          await agent.put(`/Activities/${activity.id}`, activity);
        } else {
          await agent.post("/Activities", activity);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    },
    onSuccess: async () => {
      await reactQueryclient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/Activities/${id}`);
    },
    onSuccess: async () => {
      await reactQueryclient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/Activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      await reactQueryclient.cancelQueries({
        queryKey: ["activities", activityId],
      });
      const prevActivity = reactQueryclient.getQueryData<IActivity>([
        "activities",
        activityId,
      ]);
      reactQueryclient.setQueryData<IActivity>(
        ["activities", activityId],
        (oldData) => {
          if (!oldData || !getCurrentUser()) return oldData;

          const isHost = oldData.hostId === getCurrentUser()?.sub;
          const isAttending = oldData.attendees.some(
            (x) => x.id === getCurrentUser()?.sub
          );

          return {
            ...oldData,
            isCancelled: isHost ? !oldData.isCancelled : oldData.isCancelled,
            attendees: isAttending
              ? isHost
                ? oldData.attendees
                : oldData.attendees.filter(
                    (x) => x.id !== getCurrentUser()?.sub
                  )
              : [
                  ...oldData.attendees,
                  {
                    id: getCurrentUser()?.sub,
                    displayName: getCurrentUser()?.displayName,
                    bio: getCurrentUser()?.bio,
                    imageUrl: getCurrentUser()?.imageUrl,
                  } as Profile,
                ],
          };
        }
      );
      return { prevActivity };
    },
    onError: async (_, variables, context) => {
      if (context?.prevActivity) {
        reactQueryclient.setQueryData<IActivity>(
          ["activities", variables],
          context.prevActivity
        );
      }
    },
  });

  return {
    data,
    isError,
    isLoading,
    updateActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
