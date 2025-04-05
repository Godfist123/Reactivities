import React, { useState } from "react";
import { IActivity } from "../../Domain/Activity";
import ActivityDashboard from "../Components/Activity/ActivityDashboard/ActivityDashboard";
import { Box } from "@mui/material";
import { useActivityContext } from "../Context/ActivityContext";
import { useActivityList } from "../Hooks/useActivityList";

const ActivityList: React.FC = () => {
  const [SelectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const { setEditMode, editMode } = useActivityContext();

  const { data: dataGroup, isError, isLoading } = useActivityList();
  const oldData = dataGroup?.pages.flatMap((x) => x.items);
  const data = Array.isArray(oldData)
    ? oldData.map((x) => ({
        ...x,
        date: new Date(x.date).toISOString().split("T")[0],
      }))
    : [];

  const handleEditOn = (id?: string) => {
    if (!data) return; // ✅ Prevents running .find() on undefined

    if (id) {
      setSelectedActivity(data.find((x) => x.id === id) || null);
    }
    setEditMode(true);
  };

  const handleEditOff = () => {
    setEditMode(false);
    setSelectedActivity(null);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", ml: 1, mr: 1, minHeight: "100vh" }}>
      {isError && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}

      {!isLoading && !isError && data && (
        <ActivityDashboard
          data={data}
          EditMode={editMode}
          HandleEditOn={handleEditOn}
          HandleEditOff={handleEditOff}
          SelectedActivity={SelectedActivity}
          setSelectedActivity={setSelectedActivity}
        />
      )}
    </Box>
  );
};

export default ActivityList;
