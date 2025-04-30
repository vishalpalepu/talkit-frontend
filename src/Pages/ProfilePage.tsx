import React, { useRef, ChangeEvent,useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  Container,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import useAppData from "../store/useAuthCheck";
import Navbar from "../components/Navbar";
import useAuthCheck from "../store/useAuthCheck";

interface User {
  name: string;
  email: string;
  profilePic?: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const { userAuth }: { userAuth: User } = useAppData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

const {isUpdatingProfile}:{isUpdatingProfile : boolean} = useAuthCheck();
const {updatePhoto,checkAuth} = useAuthCheck();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await updatePhoto(file);
    }
  };
  useEffect(()=>{
    checkAuth();
  },[userAuth,updatePhoto,isUpdatingProfile])

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Navbar  />
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 4
            }}
          >
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#f2f8fd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4
              }}
            >
              <Box position="relative" display="inline-block" mb={2}>
                <Avatar
                  src={userAuth?.profilePic || "https://i.pravatar.cc/150?img=1"}
                  sx={{ width: 100, height: 100, mx: "auto" }}
                />
                <IconButton
                  onClick={handleAvatarClick}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 1
                  }}
                >
                  <CameraAlt fontSize="small" />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Click the camera icon to update your photo
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 2,
                backgroundColor: "#ffffff",
                p: 4
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Profile
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Your profile information
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Full Name"
                value={userAuth?.name || ""}
                InputProps={{ readOnly: true }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                value={userAuth?.email || ""}
                InputProps={{ readOnly: true }}
              />

              <Box textAlign="left" mt={4}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Account Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member Since: {userAuth?.createdAt
                    ? new Date(userAuth.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "N/A"}
                </Typography>
                <Typography variant="body2" color="success.main">
                  Account Status: Active
                </Typography>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;