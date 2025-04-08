import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulated backend error
    const fakeResponse = "User not found"; // or "Incorrect password"
    setError(fakeResponse);
    setOpen(true);

    // Auto close after 1 second
    setTimeout(() => setOpen(false), 1000);
  };

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
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ fontSize: 13, marginTop: 6 }}>
            Login to access your account.
          </p>
          <Button
            variant="outlined"
            style={{ marginTop: 14, color: "white", borderColor: "white" }}
            onClick={() => navigate("/register")}
          >
            REGISTER
          </Button>
        </div>

        {/* Right Panel */}
        <div
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
        </div>
      </div>

      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

// For previewing the login page in isolation
export default function LoginPageWrapper() {
  return (
      <LoginPage />
  );
}
