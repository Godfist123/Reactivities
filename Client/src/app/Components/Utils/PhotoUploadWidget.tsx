import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

interface PhotoUploadWidgetProps {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

const PhotoUploadWidget: React.FC<PhotoUploadWidgetProps> = ({
  uploadPhoto,
  loading,
}) => {
  const [files, setFiles] = React.useState<(File & { preview: string })[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file as Blob) })
      )
    );
  };

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob(
      (blob) => {
        if (blob) {
          uploadPhoto(blob);
        }
      },
      "image/jpeg",
      0.8
    );
  }, [uploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: undefined,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined,
  });

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={4}>
        <Typography variant="overline" color="secondary">
          Step 1 - Add Photo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "dashed 3px #eee",
            borderColor: isDragActive ? "#2196f3" : "#eee",
            borderRadius: 2,
            pt: "30px",
            textAlign: "center",
            height: "280px",
          }}
        >
          <input {...getInputProps()} type="file" />
          <CloudUpload sx={{ fontSize: 80 }} />
          <Typography variant="h5" color="text.secondary">
            Drop Image Here
          </Typography>
        </Box>
      </Grid2>
      <Grid2 size={4}>
        <Typography variant="overline" color="secondary">
          Step 2 - Resize
        </Typography>
        {files[0]?.preview && (
          <Cropper
            ref={cropperRef}
            style={{ height: 300, width: "90%" }}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            src={files[0]?.preview}
            background={false}
          />
        )}
      </Grid2>
      <Grid2 size={4}>
        <Typography variant="overline" color="secondary">
          Step 3 - Preview & Upload
        </Typography>
        <div
          className="img-preview"
          style={{ width: 300, height: 300, overflow: "hidden" }}
        />
        <Button
          sx={{ mt: 1, width: 300 }}
          variant="contained"
          color="primary"
          onClick={onCrop}
          disabled={loading}
        >
          Upload
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default PhotoUploadWidget;
