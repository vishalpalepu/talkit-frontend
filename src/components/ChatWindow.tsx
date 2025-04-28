// ChatWindow.tsx
import React from "react";
import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import useChatState from "../store/useChatState";

const ChatWindow: React.FC = () => {
  const { selectedUser } = useChatState();

  // Ensure sendMessage and sendImage are implemented in your Zustand store.
  const handleSendMessage = (text: string) => {
    // Replace with your sendMessage logic
    // sendMessage(text);
  };

  const handleSendImage = (file: File) => {
    // Replace with your sendImage logic
    // sendImage(file);
  };

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
      <ChatInput
      />
    </Box>
  );
};

export default ChatWindow;
