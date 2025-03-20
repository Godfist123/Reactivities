import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IActivity } from "../../Domain/Activity";
import { useAxios } from "../Agent/useAxios";
import { useLocation } from "react-router-dom";

export const useActivityList = (id?: string) => {
  const reactQueryclient = useQueryClient();
  const agent = useAxios();
  const location = useLocation();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      try {
        const resp = await agent.get<IActivity[]>("/activities");

        return resp.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
    enabled: !id && location.pathname === "/activities",
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const resp = await agent.get<IActivity>(`/activities/${id}`);
      return resp.data;
    },
    enabled: !!id,
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

  return {
    data,
    isError,
    isLoading,
    updateActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
