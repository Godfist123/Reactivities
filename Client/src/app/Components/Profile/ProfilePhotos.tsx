import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../../Hooks/useProfile";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import PhotoUploadWidget from "../Utils/PhotoUploadWidget";
import StarButton from "../Utils/StarButton";
import DeleteButton from "../Utils/DeleteButton";

interface ProfilePhotosProps {
  // Define your props here
}

const ProfilePhotos: React.FC<ProfilePhotosProps> = () => {
  const { id } = useParams<{ id: string }>();
  const {
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    profile,
    setMainPhoto,
    deletePhoto,
  } = useProfile(id!);
  const [editMode, setEditMode] = React.useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto.mutate(file, {
      onSuccess: () => {
        setEditMode(false);
      },
      onError: (error) => {
        console.error("Error uploading photo:", error);
      },
    });
  };

  if (loadingPhotos) return <Typography>Loading...</Typography>;
  if (!photos) return <Typography>No photos found</Typography>;

  return (
    <Box>
      {" "}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Photos
        </Typography>
        {isCurrentUser && (
          <Button
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Done" : "Edit"}
          </Button>
        )}{" "}
      </Box>
      <Divider sx={{ my: 2 }} />
      {editMode ? (
        <PhotoUploadWidget
          uploadPhoto={handlePhotoUpload}
          loading={uploadPhoto.isPending}
        />
      ) : (
        <>
          {photos.length === 0 ? (
            <Typography>No Photos</Typography>
          ) : (
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {photos.map((item) => (
                <ImageListItem key={item.id} sx={{ position: "relative" }}>
                  <img
                    srcSet={`${item.url.replace(
                      "/upload/",
                      "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
                    )} `}
                    src={`${item.url.replace(
                      "/upload/",
                      "/upload/w_164,h_164,c_fill,f_auto,g_face/"
                    )}`}
                    alt={item.id}
                    loading="lazy"
                  />
                  {isCurrentUser && (
                    <Box
                      sx={{ position: "absolute", top: 0, left: 0 }}
                      onClick={() => setMainPhoto.mutate(item.id)}
                    >
                      <StarButton selected={item.url === profile?.imageUrl} />
                    </Box>
                  )}
                  {profile?.imageUrl !== item.url && isCurrentUser && (
                    <Box
                      sx={{ position: "absolute", top: 0, right: 0 }}
                      onClick={() => {
                        deletePhoto.mutate(item.id);
                      }}
                    >
                      <DeleteButton />
                    </Box>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </>
      )}
    </Box>
  );
};

export default ProfilePhotos;
