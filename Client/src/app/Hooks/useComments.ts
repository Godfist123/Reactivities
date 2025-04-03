import { useLocalObservable } from "mobx-react-lite";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React from "react";
import { ChatComment } from "../../Domain/ChatComment";
import { runInAction } from "mobx";

interface ICommentStore {
  hubConnection: HubConnection | null;
  comments: ChatComment[];
  createHubConnection: (activityId: string) => void;
  stopHubConnection: () => void;
}

export const useComments = (activityId: string) => {
  const commentStore = useLocalObservable<ICommentStore>(() => ({
    hubConnection: null,
    comments: [],

    createHubConnection: (activityId: string) => {
      if (!activityId) return;
      commentStore.hubConnection = new HubConnectionBuilder()
        .withUrl(
          `${import.meta.env.VITE_COMMENT_URL}?activityId=${activityId}`,
          {
            accessTokenFactory: () => localStorage.getItem("token") ?? "", // ✅ attach JWT here
            withCredentials: false, // 🔸 keep this false when using token auth
          }
        )
        .withAutomaticReconnect()
        .build();
      commentStore.hubConnection
        .start()
        .catch((error) => console.log("Error establishing connection", error));

      commentStore.hubConnection.on("LoadComments", (comments) => {
        runInAction(() => {
          commentStore.comments = Array.isArray(comments.data)
            ? comments.data
            : [];
        });
      });

      commentStore.hubConnection.on("ReceiveComment", (comment) => {
        console.log("🚀 Received comment:", comment);
        runInAction(() => {
          if (commentStore.comments) {
            commentStore.comments.unshift(comment.data);
          } else {
            commentStore.comments = [comment.data];
          }
        });
      });
    },

    stopHubConnection: () => {
      commentStore.hubConnection
        ?.stop()
        .catch((error) => console.log("Error stopping connection", error));
    },
  }));

  React.useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.stopHubConnection();
      commentStore.comments = [];
    };
  }, [activityId, commentStore]);

  return commentStore;
};
