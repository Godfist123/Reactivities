import React from "react";
import { IActivity } from "../../Domain/Activity";
import { Grid2 } from "@mui/material";
import { useParams } from "react-router-dom";
import ActivityDetailChat from "../Components/Activity/ActivityDetail/ActivityDetailChat";
import ActivityDetailHeader from "../Components/Activity/ActivityDetail/ActivityDetailHeader";
import ActivityDetailInfo from "../Components/Activity/ActivityDetail/ActivityDetailInfo";
import ActivityDetailSidebar from "../Components/Activity/ActivityDetail/ActivityDetailSidebar";
import { useActivityList } from "../Hooks/useActivityList";

interface ActivityDetailProps {}

const ActivityDetail: React.FC<ActivityDetailProps> = (props) => {
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivityList(id) as {
    activity: IActivity;
    isLoadingActivity: boolean;
  };
  if (isLoadingActivity) return <div>Loading...</div>;

  return (
    <>
      <Grid2 container spacing={2} sx={{ padding: "1.5rem" }}>
        <Grid2 size={8}>
          <ActivityDetailHeader data={activity} />
          <ActivityDetailInfo data={activity} />
          <ActivityDetailChat data={activity} />
        </Grid2>
        <Grid2 size={4}>
          <ActivityDetailSidebar activity={activity} />
        </Grid2>
      </Grid2>
    </>
  );
};

export default ActivityDetail;
