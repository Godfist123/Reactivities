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
    enabled: !id && location.pathname === "/Activities",
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      console.log("✅ QUERY FUNCTION RUNNING for Activity ID:", id);
      const resp = await agent.get<IActivity>(`/activities/${id}`);
      console.log("✅ API Response:", resp);
      return resp.data;
    },
    enabled: !!id,
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: IActivity) => {
      if (activity.id) {
        await agent.put(`/Activities/${activity.id}`, activity);
      } else {
        await agent.post("/Activities", activity);
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
