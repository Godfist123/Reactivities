import React from "react";
import { useAccount } from "../Hooks/useAccount";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { AppRegistration } from "@mui/icons-material";
import {
  registerSchema,
  RegisterSchema,
} from "../Components/Activity/Schema/registerSchema";

interface RegisterProps {
  // Define your props here
}

const Register: React.FC<RegisterProps> = () => {
  const { registerUser } = useAccount();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (error) => {
        console.log("err", error);
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.code.includes("Email")) {
              console.log("email");
              setError("email", { message: err.description });
            }
            if (err.code.includes("Display")) {
              setError("displayName", { message: err.description });
            }
            if (err.code.includes("Password")) {
              setError("password", { message: err.description });
            }
          });
        }
      },
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        mt: 5,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 2,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
        <AppRegistration fontSize="large" />
        <Typography variant="h5">Register</Typography>
      </Box>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Email"
            fullWidth
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="displayName"
        control={control}
        render={({ field }) => (
          <TextField
            label="DisplayName"
            fullWidth
            {...field}
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            label="ConfirmPassword"
            type="password"
            fullWidth
            {...field}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Register
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Already have an account?
        <Button href="/login" color="primary">
          Sign In
        </Button>
      </Typography>
    </Paper>
  );
};

export default Register;
