import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../store/useAuthCheck"

const Navbar = () => {
  const navigate = useNavigate();
  const { userAuth, logout } = useAuthCheck();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6A1B9A" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Talkit
        </Typography>
        <div>
          {userAuth ? (
            <>
              <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
              <Button color="inherit" onClick={() => navigate("/setting")}>Settings</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
