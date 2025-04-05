import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useComments } from "../../../Hooks/useComments";
import { timeAgo } from "../../../Utils/TimeAgo";
import { useForm, Controller } from "react-hook-form";
import { observer } from "mobx-react-lite";

const ActivityDetailsChat = observer(function ActivityDetailsChat() {
  const { id } = useParams();
  const commentStore = useComments(id as string);

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleAddComment = async (data: any) => {
    try {
      await commentStore.hubConnection?.invoke("SendComment", data.body, id);
      reset({ body: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(handleAddComment)();
    }
  };
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "primary.main",
          color: "white",
          padding: 2,
        }}
      >
        <Typography variant="h6">Chat about this event</Typography>
      </Box>
      <Card>
        <CardContent>
          <div>
            <form>
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                    onKeyDown={handleKeyDown}
                    slotProps={{
                      input: {
                        endAdornment: isSubmitting ? (
                          <CircularProgress size={24} />
                        ) : null,
                      },
                    }}
                  />
                )}
              />
            </form>
          </div>

          <Box sx={{ height: "400px", overflowY: "auto" }}>
            {commentStore.comments?.map((comment) => (
              <Box sx={{ display: "flex", my: 2 }} key={comment.id}>
                <Avatar
                  src={comment.imageUrl}
                  alt={"user image"}
                  sx={{ mr: 2 }}
                />
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" gap={3}>
                    <Typography
                      component={Link}
                      to={`/profiles/${comment.userId}`}
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", textDecoration: "none" }}
                    >
                      {comment.displayName}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {timeAgo(comment.createdAt)}
                    </Typography>
                  </Box>

                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {comment.body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
});
export default ActivityDetailsChat;
