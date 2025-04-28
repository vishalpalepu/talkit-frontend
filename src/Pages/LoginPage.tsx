import React, { useState ,useEffect} from "react";
import { TextField, Button,IconButton,InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import {motion} from 'framer-motion'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuthCheck from "../store/useAuthCheck";

type LoginFormData = {
  email : string,
  password : string,
}

const schema = yup.object().shape({
  email : yup.string().required("email is required").email(),
  password : yup.string().required("password is required")
})

const LoginPage : React.FC= () => {
  const {
    handleSubmit,
    watch,
    register,
    formState : {errors}
  } = useForm<LoginFormData>({resolver : yupResolver(schema)})
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);

  const {userAuth,checkAuth,isLogginnIn,login} = useAuthCheck()

  watch("email");
  watch("password");

  const onSubmit =async  (data: LoginFormData) => {
    await login(data);
  }
  useEffect(() => {
    checkAuth();
  if (userAuth) {
    navigate("/");
  }
}, [userAuth,navigate,checkAuth]);

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Simulated backend error
  //   const fakeResponse = "User not found"; // or "Incorrect password"
  //   setError(fakeResponse);
  //   setOpen(true);

  //   // Auto close after 1 second
  //   setTimeout(() => setOpen(false), 1000);
  // };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #64b5f6, #b3e5fc)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "90%",
          maxWidth: 1100,
          display: "flex",
          overflow: "hidden",
          height: "65vh",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            background: "#2196f3",
            color: "white",
            padding: 24,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <h2 style={{ fontSize: 22, fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ fontSize: 13, marginTop: 6 }}>
            Login to access your account.
          </p>
          <Button
            variant="outlined"
            style={{ marginTop: 14, color: "white", borderColor: "white" }}
            onClick={() => navigate("/register")}
          >
            REGISTER
          </Button> */}
          <motion.div
            animate={{ y: 7 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: "center" }}
          >
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Welcome Back</h2>
            <p style={{ fontSize: 13, marginTop: 6 }}>Login to access your account.</p>
            <Button variant="outlined" style={{ marginTop: 14, color: 'white', borderColor: 'white' }} onClick={()=>{navigate("/register")}}>
              REGISTER
            </Button>
          </motion.div>
        </div>

        {/* Right Panel */}
        {/* <div
          style={{
            padding: 24,
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              width: "80%",
              maxWidth: 340,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 6,
              }}
            >
              Login
            </h2>
            <TextField label="Email" fullWidth size="small" />
            <TextField
              label="Password"
              type="password"
              fullWidth
              size="small"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#42a5f5", color: "#fff", minWidth: 140 }}
              >
                SIGN IN
              </Button>
            </div>
          </form>
        </div> */}
        <div style={{ padding: 24, width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "80%", maxWidth: 340 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 6 }}>Login</h2>
            <p style={{ textAlign: "center", fontSize: 13, marginBottom: 14 }}>Login to access your account.</p>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <TextField
                label="Email"
                fullWidth
                size="small"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type={showPassword?"text" : "password"}
                fullWidth
                size="small"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                    InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#42a5f5", color: "#fff", minWidth: 140 }}
                >
                  SIGN IN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

// For previewing the login page in isolation
export default function LoginPageWrapper() {
  return (
      <LoginPage />
  );
}
