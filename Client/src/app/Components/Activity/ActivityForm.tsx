import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IActivity } from "../../../Domain/Activity";
import { useActivityList } from "../../Hooks/useActivityList";
import { useNavigate, useParams } from "react-router-dom";

interface ActivityFormProps {}

const ActivityForm: React.FC<ActivityFormProps> = () => {
  const { id } = useParams();
  const { updateActivity, data } = useActivityList(id) as {
    data: IActivity | undefined;
    updateActivity: any;
  };
  const { control, handleSubmit, reset } = useForm<IActivity>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: "",
      city: "",
      venue: "",
    },
  });
  const navi = useNavigate();

  useEffect(() => {
    if (data) {
      reset(data as IActivity); // Populate form with selected activity
    }
  }, [data, reset]);

  const onSubmit = async (data: IActivity) => {
    await updateActivity.mutateAsync(data);
    navi(-1);
  };

  return (
    <Paper sx={{ borderRadius: 3, p: 3 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Activity Form
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        mb={2}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField label="Title" fullWidth {...field} />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              {...field}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField label="Category" fullWidth {...field} />
          )}
        />

        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...field}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField label="City" fullWidth {...field} />
          )}
        />

        <Controller
          name="venue"
          control={control}
          render={({ field }) => (
            <TextField label="Venue" fullWidth {...field} />
          )}
        />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            type="submit"
            variant="outlined"
            disabled={updateActivity.isPending}
          >
            Submit
          </Button>
          <Button type="button" variant="outlined" onClick={() => navi(-1)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
