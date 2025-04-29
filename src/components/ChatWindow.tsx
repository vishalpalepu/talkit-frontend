// ChatWindow.tsx
import React from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import useChatState from "../store/useChatState";

const ChatWindow: React.FC = () => {
  const { selectedUser } = useChatState();

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <ChatHeader />
      <Messages />
      <ChatInput/>
    </Box>
  );
};

export default ChatWindow;
