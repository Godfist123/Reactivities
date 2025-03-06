import axios from "axios";
import React, { useEffect, useState } from "react";
import { IActivity } from "../../Domain/Activity";
import ActivityDashboard from "../Components/Activity/ActivityDashboard";
import { Box } from "@mui/material";
import { useActivityContext } from "../Context/ActivityContext";

interface ActivityListProps {
  // Define your props here
}

const ActivityList: React.FC<ActivityListProps> = (props) => {
  const [data, setData] = useState<IActivity[]>([]);
  const [SelectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const { setEditMode, editMode } = useActivityContext();

  const handleEditOn = (id?: string) => {
    if (id) {
      setSelectedActivity(data.find((x) => x.id === id) || null);
    }
    setEditMode(true);
  };
  const handleEditOff = () => {
    setEditMode(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<IActivity[]>(
        "http://localhost:5106/api/activities"
      );
      const result = response.data;
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <Box sx={{ bgcolor: "#eeeeee", ml: 1, mr: 1 }}>
      <ActivityDashboard
        data={data}
        EditMode={editMode}
        HandleEditOn={handleEditOn}
        HandleEditOff={handleEditOff}
        SelectedActivity={SelectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
    </Box>
  );
};

export default ActivityList;
