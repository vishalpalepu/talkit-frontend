// ChatInput.tsx
import React, { useState, useRef, ChangeEvent } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import { Send, InsertEmoticon, Close, Image } from "@mui/icons-material";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import useChatState from "../store/useChatState";



const ChatInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {sendMessage}  = useChatState();

  // Append selected emoji to the message
  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native);
  };

  // Handle the image file selection and preview setup
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Send image (if one exists) or text message
  const handleSend = async  () => {
    if(message.trim() || imageFile){

      const text = message.trim();
      const image =  imageFile;

      setMessage("");
      setShowEmojiPicker(false);
      setImagePreview(null);
      setImageFile(null);

      await sendMessage({
        text : text,
        imageFile : image
      })
      
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderTop: "1px solid #d81b60", // pink border for separation
        position: "relative",
        // A subtle gradient background using dark purple shades
        background: "linear-gradient(45deg, #2c2c54, #6a1b9a)",
      }}
    >
      {imagePreview && (
        <Box
          sx={{
            mb: 1,
            position: "relative",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img src={imagePreview} alt="Preview" style={{ maxHeight: 150 }} />
          <IconButton
            onClick={() => {
              setImagePreview(null);
              setImageFile(null);
            }}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          >
            <Close sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          bgcolor: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 2,
        }}
      >
        <Tooltip title="Emoji">
          <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <InsertEmoticon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Send image">
          <IconButton onClick={() => fileInputRef.current?.click()}>
            <Image sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        <InputBase
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ ml: 1, flex: 1, color: "white" }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton onClick={handleSend} disabled={!message && !imageFile}>
          <Send sx={{ color: "#d81b60" }} />
        </IconButton>
      </Paper>

      {showEmojiPicker && (
        <Box
          sx={{
            position: "absolute",
            bottom: 70,
            left: 10,
            zIndex: 2,
          }}
        >
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </Box>
      )}
    </Box>
  );
};

export default ChatInput;
