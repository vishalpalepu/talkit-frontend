// Messages.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import useChatState from "../store/useChatState";

const Messages: React.FC = () => {
  const { messages, selectedUser } = useChatState();

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        backgroundColor: "#121212",
      }}
    >
      {messages.length === 0 ? (
        <Typography variant="body2" color="gray" align="center">
          No messages yet.
        </Typography>
      ) : (
        messages.map((msg: any, index: number) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                msg.senderId === selectedUser?._id ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                bgcolor: msg.senderId === selectedUser?._id ? "#d81b60" : "#6a1b9a",
                color: "white",
                p: 1,
                borderRadius: 2,
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Messages;

