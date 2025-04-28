// ChatHeader.tsx
import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import useChatState from "../store/useChatState";

const ChatHeader: React.FC = () => {
  const { selectedUser, setSelectedUser } = useChatState();

  if (!selectedUser) return null;

  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        borderBottom: "1px solid #444",
        background: "linear-gradient(45deg, #6a1b9a, #d81b60)", // purple to pink tint
      }}
    >
      <Box display="flex" alignItems="center">
        <Avatar src={selectedUser.profilePic} sx={{ mr: 1 }} />
        <Typography variant="subtitle1" fontWeight={500} color="white">
          {selectedUser.name}
        </Typography>
      </Box>
      <IconButton onClick={() => setSelectedUser(null)}>
        <Close sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default ChatHeader;
