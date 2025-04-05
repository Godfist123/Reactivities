import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../Domain/Profile";
import { useAxios } from "../Agent/useAxios";
import { Photo } from "../../Domain/Photo";
import { useMemo } from "react";
import { getCurrentUser } from "../Utils/GetCurrentUser";

export const useProfile = (id?: string, predicate?: string) => {
  const agent = useAxios();
  const queryclient = useQueryClient();

  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      return (await agent.get<Profile>(`/Profile/${id}`)).data;
    },
    enabled: !!id && !predicate, // Only run the query if id is provided
  });

  const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
    queryKey: ["photos", id],
    queryFn: async () => {
      return (await agent.get<Photo[]>(`/Profile/Photos/${id}`)).data;
    },
    enabled: !!id && !predicate, // Only run the query if id is provided
  });

  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      return (
        await agent.post<Photo>(`/Profile/add-photo`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({ queryKey: ["photos", id] });
      await queryclient.invalidateQueries({ queryKey: ["profile", id] });
    },
  });

  const setMainPhoto = useMutation({
    mutationFn: async (photoId: string) => {
      return await agent.put(`/Profile/set-main-photo/${photoId}`);
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({ queryKey: ["photos", id] });
      await queryclient.invalidateQueries({ queryKey: ["profile", id] });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      return await agent.delete(`/Profile/delete-photo/${photoId}`);
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({ queryKey: ["photos", id] });
      await queryclient.invalidateQueries({ queryKey: ["profile", id] });
    },
  });

  const isCurrentUser = useMemo(() => {
    return getCurrentUser()?.sub === id;
  }, [id]);

  const updateFollowing = useMutation({
    mutationFn: async (targetId: string) => {
      await agent.post(`/Profile/follow/${targetId}`);
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({ queryKey: ["profile", id] });
      await queryclient.invalidateQueries({
        queryKey: ["followings", id, "followers"],
      });
    },
  });

  const { data: followings, isLoading: loadingFollowings } = useQuery<
    Profile[]
  >({
    queryKey: ["followings", id, predicate],
    queryFn: async () => {
      const response = await agent.get<Profile[]>(
        `/Profile/follow-list/${id}`,
        {
          params: { predicate },
        }
      );
      return response.data;
    },
    enabled: !!id && !!predicate,
  });

  return {
    profile,
    isLoading,
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    deletePhoto,
    updateFollowing,
    followings,
    loadingFollowings,
  };
};
