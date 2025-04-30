import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import useChatState from "../store/useChatState";
import useAuthCheck from "../store/useAuthCheck";

const Sidebar = () => {
  const {
    users,
    isUsersLoading,
    getUsers,
    selectedUser,
    setSelectedUser, // make sure this is part of your store
  } = useChatState();

  const {onlineUsers} = useAuthCheck();


  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Box
      sx={{
        width: 300,
        height: "calc(100vh - 64px)",
        overflowY: "auto",
        bgcolor: "#f3e5f5",
        borderRight: "1px solid #ccc",
      }}
    >
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
              backgroundColor:
                selectedUser?._id === user._id ? "#E1BEE7" : "transparent",
              "&:hover": { backgroundColor: "#F3E5F5" },
            }}
          >
            {/* Avatar with online status dot */}
            <Box sx={{ position: "relative", mr: 1.5 }}>
              <Avatar
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                sx={{ width: 48, height: 48 }}
              />
              {onlineUsers?.includes(user._id) && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    bgcolor: "#4caf50", // green
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              )}
            </Box>

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
