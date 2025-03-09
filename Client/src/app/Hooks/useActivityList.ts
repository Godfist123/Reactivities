import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IActivity } from "../../Domain/Activity";
import agent from "../Agent/Axios";

export const useActivityList = () => {
  const reactQueryclient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const resp = await agent.get<IActivity[]>("/activities");
      return resp.data;
    },
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

  return { data, isError, isLoading, updateActivity, deleteActivity };
};
