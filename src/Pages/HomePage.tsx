import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import { Box, Typography } from "@mui/material";
import useChatState from "../store/useChatState";
 // If you’ve built it

const HomePage: React.FC = () => {
  const { selectedUser } = useChatState();

  return (
    <>
      <Navbar />
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          {selectedUser ? (
            <div> to do the work</div>
          ) : (
            <Box textAlign="center">
              <img
                src="https://res.cloudinary.com/dcykirrjp/image/upload/v1744297375/yiqqevwjp8ifh4gkowkk.png"
                alt="Talkit Logo"
                style={{ width: 200, marginBottom: 16 }}
              />
              <Typography variant="h5" color="text.secondary">
                No chat selected
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
