import React, { useEffect, useRef, useState } from "react";
import { IActivity } from "../../../Domain/Activity";
import { Box, Grid2, List } from "@mui/material";
import ActivityCard from "./ActivityCard";
import ActivityDetail from "./ActivityDetail";
import { useOutsideClick } from "../../Hooks/useOutsideClick";
import ActivityForm from "./ActivityForm";
import { useActivityContext } from "../../Context/ActivityContext";
import { useActivityList } from "../../Hooks/useActivityList";

interface ActivityDashboardProps {
  data: IActivity[];
  EditMode: boolean;
  HandleEditOn: () => void;
  HandleEditOff: () => void;
  SelectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard: React.FC<ActivityDashboardProps> = (props) => {
  const { data, HandleEditOff, HandleEditOn, SelectedActivity } = props;
  const [Selected, setSelected] = useState<IActivity | null>(null);
  const { editMode, setEditMode } = useActivityContext();
  const { data: selectedData } = useActivityList();
  useEffect(() => {
    if (selectedData) {
      setSelected(selectedData.find((x) => x.id === Selected?.id) || null);
    }
  }, [selectedData]);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setSelected(null);
    HandleEditOff();
  });

  const SelectActivityHandler = (activity: IActivity) => {
    setSelected(activity);
  };
  const CancelSelectActivityHandler = () => {
    setSelected(null);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={7}>
        <List
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "column",
            width: "100%",
          }}
        >
          {data.map((obj: IActivity) => {
            return (
              <ActivityCard
                data={obj}
                key={obj.id}
                SelectActivityHandler={SelectActivityHandler}
                HandleEditOff={HandleEditOff}
              />
            );
          })}
        </List>
      </Grid2>
      <Grid2 size={5}>
        {data[0] && (
          <Box
            ref={ref}
            sx={{
              position: "sticky",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {editMode ? (
              <ActivityForm
                HandleEditOff={HandleEditOff}
                SelectedActivity={SelectedActivity}
              />
            ) : (
              <ActivityDetail
                data={Selected}
                CancelSelectActivityHandler={CancelSelectActivityHandler}
                HandleEditOn={HandleEditOn}
              />
            )}
          </Box>
        )}
      </Grid2>
    </Grid2>
  );
};

export default ActivityDashboard;
