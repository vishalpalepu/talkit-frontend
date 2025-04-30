import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const NoChatSelected: React.FC = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <motion.img
        src="https://res.cloudinary.com/dcykirrjp/image/upload/v1745991995/talkit/messages/ubnmucipo9ihukq6por4.png"
        alt="Talkit Logo"
        style={{ width: 180, marginBottom: 20 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Typography variant="h5" color="text.secondary">
        No chat selected
      </Typography>
    </Box>
  );
};

export default NoChatSelected;
