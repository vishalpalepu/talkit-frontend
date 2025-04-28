import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { Box } from "@mui/material";
import useChatState from "../store/useChatState";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatWindow";

const HomePage: React.FC = () => {
  const { selectedUser } = useChatState();

  return (
    <>
      <Navbar />
      <Box display="flex" height="calc(100vh - 64px)">
        <Sidebar />
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {selectedUser ? (
            <ChatContainer/>
          ) : (
            <NoChatSelected />
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
