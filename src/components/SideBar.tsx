import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import useChatState from "../store/useChatState"; // Update this path if needed

const Sidebar = () => {
  const {
    users,
    isUsersLoading,
    getUsers,
    selectedUser,
    setSelectedUser,
  } = useChatState();

  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ width: 300, height: "calc(100vh - 64px)", overflowY: "auto", bgcolor: "#f3e5f5", borderRight: "1px solid #ccc" }}>
      <Typography variant="h6" sx={{ p: 2, color: "#6A1B9A" }}>
        Chats
      </Typography>
      <Divider />

      {isUsersLoading ? (
        <Stack spacing={2} p={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" height={50} />
          ))}
        </Stack>
      ) : (
        users.map((user: any) => (
          <Box
            key={user._id}
            onClick={() => setSelectedUser(user)}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1.5,
              cursor: "pointer",
              backgroundColor: selectedUser?._id === user._id ? "#E1BEE7" : "transparent",
              "&:hover": { backgroundColor: "#F3E5F5" },
            }}
          >
            <Avatar src={user.profilePic} sx={{ mr: 1.5 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.name || "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.lastMessage || "No messages yet"}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Sidebar;
