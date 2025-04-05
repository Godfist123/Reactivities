import React, { useEffect, useRef, useState } from "react";
import { IActivity } from "../../../../Domain/Activity";
import { Box, Grid2, List } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useOutsideClick } from "../../../Hooks/useOutsideClick";
import { useActivityList } from "../../../Hooks/useActivityList";
import ActivityFilters from "./ActivityFilters";
import { useInView } from "react-intersection-observer";
import { observer } from "mobx-react-lite";

interface ActivityDashboardProps {
  data: IActivity[];
  EditMode: boolean;
  HandleEditOn: () => void;
  HandleEditOff: () => void;
  SelectedActivity: IActivity | null;
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDashboard = observer((props: ActivityDashboardProps) => {
  const { data, HandleEditOff } = props;
  const [Selected, setSelected] = useState<IActivity | null>(null);
  const { data: datalist, fetchNextPage, hasNextPage } = useActivityList();
  const selectedData = datalist?.pages.flatMap((x) => x.items);
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

  const { ref: inViewRef } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
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
          {selectedData?.map((obj: IActivity, index) => {
            return (
              <Box
                key={obj.id}
                ref={index === selectedData?.length - 1 ? inViewRef : undefined}
              >
                <ActivityCard data={obj} key={obj.id} />
              </Box>
            );
          })}
        </List>
      </Grid2>
      <Grid2
        size={4}
        sx={{ position: "sticky", top: 112, alignSelf: "flex-start" }}
      >
        <ActivityFilters />
      </Grid2>
    </Grid2>
  );
});

export default ActivityDashboard;
