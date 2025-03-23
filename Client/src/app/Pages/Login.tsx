import React from "react";
import { useAccount } from "../Hooks/useAccount";
import { Controller, useForm } from "react-hook-form";
import {
  loginSchema,
  LoginSchema,
} from "../Components/Activity/Schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";

interface LoginProps {
  // Define your props here
}

const Login: React.FC<LoginProps> = () => {
  const { loginUser } = useAccount();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data);
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
        <LockOpen fontSize="large" />
        <Typography variant="h5">Login</Typography>
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Login
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        Don't have an account?
        <Button href="/register" color="primary">
          Register Now
        </Button>
      </Typography>
    </Paper>
  );
};

export default Login;
