// // Messages.tsx
// import React from "react";
// import { Box, Typography } from "@mui/material";
// import useChatState from "../store/useChatState";

// const Messages: React.FC = () => {
//   const { messages, selectedUser } = useChatState();

//   return (
//     <Box
//       sx={{
//         flex: 1,
//         overflowY: "auto",
//         p: 2,
//         backgroundColor: "#121212",
//       }}
//     >
//       {messages.length === 0 ? (
//         <Typography variant="body2" color="gray" align="center">
//           No messages yet.
//         </Typography>
//       ) : (
//         messages.map((msg: any, index: number) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent:
//                 msg.senderId === selectedUser?._id ? "flex-end" : "flex-start",
//               mb: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 bgcolor: msg.senderId === selectedUser?._id ? "#d81b60" : "#6a1b9a",
//                 color: "white",
//                 p: 1,
//                 borderRadius: 2,
//                 maxWidth: "70%",
//                 wordBreak: "break-word",
//               }}
//             >
//               <Typography variant="body2">{msg.text}</Typography>
//             </Box>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// };

// export default Messages;
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import useChatState from "../store/useChatState";
import useAuthState from "../store/useAuthCheck";

const isOnlyEmoji = (text: string): boolean => {
  if (!text) return false;
  const emojiRegex =
    /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})+$/gu;
  const stripped = text.trim().replace(/\s+/g, "");
  return emojiRegex.test(stripped);
};

const Messages: React.FC = () => {
  const {
    messages,
    selectedUser,
    getMessages,
    isMessagesLoading,
  } = useChatState();

  const { userAuth } = useAuthState();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        backgroundColor: "#121212",
      }}
    >
      {isMessagesLoading ? (
        <Typography variant="body2" color="gray" align="center">
          Loading messages...
        </Typography>
      ) : messages.length === 0 ? (
        <Typography variant="body2" color="gray" align="center">
          No messages yet.
        </Typography>
      ) : (
        messages.map((msg: any, index: number) => {
          const isSentByMe = msg.senderID === userAuth?._id;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: isSentByMe ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: isSentByMe ? "#d81b60" : "#6a1b9a",
                  color: "white",
                  p: 1.2,
                  borderRadius: 2,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >

                {msg.image && (
                  <Box mt={msg.text ? 1 : 0}>
                    <img
                      src={msg.image}
                      alt="sent"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                )}


                {msg.text && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: isOnlyEmoji(msg.text) ? "2rem" : "1rem",
                      lineHeight: 1.5,
                      textAlign: isSentByMe ? "right" : "left",
                    }}
                  >
                    {msg.text}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default Messages;

// import React, { useEffect, useRef } from "react";
// import { Box, Typography } from "@mui/material";
// import useChatState from "../store/useChatState";
// import useAuthState from "../store/useAuthCheck";

// const isOnlyEmoji = (text: string): boolean => {
//   if (!text) return false;
//   const emojiRegex =
//     /^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{Emoji})+$/gu;
//   const stripped = text.trim().replace(/\s+/g, "");
//   return emojiRegex.test(stripped);
// };

// const Messages: React.FC = () => {
//   const {
//     messages,
//     selectedUser,
//     getMessages,
//     isMessagesLoading,
//   } = useChatState();

//   const { userAuth } = useAuthState();

//   const messagesEndRef = useRef<HTMLDivElement | null>(null); // Create a ref for the end of messages
//   const messagesContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the message container

//   useEffect(() => {
//     if (selectedUser?._id) {
//       getMessages(selectedUser._id);
//     }
//   }, [selectedUser?._id]);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <Box
//       ref={messagesContainerRef} // Attach the container ref
//       sx={{
//         flex: 1,
//         overflowY: "auto",
//         p: 2,
//         backgroundColor: "#121212",
//         display: "flex",
//         flexDirection: "column-reverse", // Makes sure the scroll starts from the bottom
//       }}
//     >
//       {isMessagesLoading ? (
//         <Typography variant="body2" color="gray" align="center">
//           Loading messages...
//         </Typography>
//       ) : messages.length === 0 ? (
//         <Typography variant="body2" color="gray" align="center">
//           No messages yet.
//         </Typography>
//       ) : (
//         messages.map((msg: any, index: number) => {
//           const isSentByMe = msg.senderID === userAuth?._id;

//           return (
//             <Box
//               key={index}
//               sx={{
//                 display: "flex",
//                 justifyContent: isSentByMe ? "flex-end" : "flex-start",
//                 mb: 1,
//               }}
//             >
//               <Box
//                 sx={{
//                   bgcolor: isSentByMe ? "#d81b60" : "#6a1b9a",
//                   color: "white",
//                   p: 1.2,
//                   borderRadius: 2,
//                   maxWidth: "70%",
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {msg.image && (
//                   <Box mt={msg.text ? 1 : 0}>
//                     <img
//                       src={msg.image}
//                       alt="sent"
//                       style={{
//                         maxWidth: "200px",
//                         maxHeight: "200px",
//                         borderRadius: "8px",
//                       }}
//                     />
//                   </Box>
//                 )}

//                 {msg.text && (
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       fontSize: isOnlyEmoji(msg.text) ? "2rem" : "1rem",
//                       lineHeight: 1.5,
//                       textAlign: isSentByMe ? "right" : "left",
//                     }}
//                   >
//                     {msg.text}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           );
//         })
//       )}

//       {/* This div will help to scroll to the bottom */}
//       <div ref={messagesEndRef} />
//     </Box>
//   );
// };

// export default Messages;


