import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IActivity } from "../../Domain/Activity";
import { useActivityList } from "../Hooks/useActivityList";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActivitySchema,
  activitySchema,
} from "../Components/Activity/activitySchema";
import SelectInput from "../Components/Utils/SelectInput";
import DatePickerComponent from "../Components/Utils/DateTimeInput";
import LocationInput from "../Components/Utils/LocationInput";

interface ActivityFormProps {}

const ActivityForm: React.FC<ActivityFormProps> = () => {
  const { id } = useParams();
  const {
    updateActivity,
    activity: data,
    isLoadingActivity,
  } = useActivityList(id) as {
    activity: IActivity | undefined;
    updateActivity: any;
    isLoadingActivity: boolean;
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActivitySchema>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: new Date(),
    },
    resolver: zodResolver(activitySchema),
  });
  const navi = useNavigate();

  const location = {
    venue: data?.venue || "",
    latitude: data?.latitude || 0,
    longitude: data?.longitude || 0,
    city: data?.city || "",
  };

  useEffect(() => {
    if (data) {
      const localDate = new Date(data.date + "Z");
      reset({
        ...data,
        date: localDate,
        location,
      } as ActivitySchema); // Populate form with selected activity
    }
  }, [data, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    try {
      await updateActivity.mutateAsync({
        ...data,
        id,
        date: data.date.toISOString(),
        venue: data.location.venue,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        city: data.location.city,
      });
    } catch (error) {
      console.error(error);
    }
    navi(-1);
  };

  if (isLoadingActivity) return <div>Loading...</div>;

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
            <TextField
              label="Title"
              fullWidth
              {...field}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
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
              error={!!errors.description}
              helperText={errors.description?.message}
              {...field}
            />
          )}
        />

        <SelectInput
          name="category"
          control={control}
          label="Category"
          options={[
            { value: "culture", label: "Culture" },
            { value: "drinks", label: "Drinks" },
            { value: "film", label: "Film" },
            { value: "food", label: "Food" },
            { value: "music", label: "Music" },
            { value: "travel", label: "Travel" },
            { value: "Networking", label: "Networking" },
          ]}
          errors={errors}
          defaultValue={data?.category as string}
        />

        <DatePickerComponent name="date" control={control} label="Date" />

        <LocationInput control={control} name="location" label="Location" />

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
