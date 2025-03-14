import React, { useEffect, useRef, useState } from "react";
import { IActivity } from "../../../../Domain/Activity";
import { Grid2, List } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { useActivityList } from "../../../Hooks/useActivityList";
import ActivityFilters from "./ActivityFilters";

interface ActivityDashboardProps {
  data: IActivity[];
  EditMode: boolean;
  HandleEditOn: () => void;
  HandleEditOff: () => void;
  SelectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard: React.FC<ActivityDashboardProps> = (props) => {
  const { data, HandleEditOff } = props;
  const [Selected, setSelected] = useState<IActivity | null>(null);
  const { data: selectedData } = useActivityList() as { data: IActivity[] };
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

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        <List
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: "column",
            width: "100%",
          }}
        >
          {data.map((obj: IActivity) => {
            return <ActivityCard data={obj} key={obj.id} />;
          })}
        </List>
      </Grid2>
      <Grid2 size={4}>
        <ActivityFilters />
      </Grid2>
    </Grid2>
  );
};

export default ActivityDashboard;
