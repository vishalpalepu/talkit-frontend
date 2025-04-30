import React from "react";
import { motion } from "framer-motion";

const LogoWithLoader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        {/* Outer purple bubble with loading animation */}
        <div className="loader-inner"></div>

        {/* Static logo content (microphone and speech bubble) */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="your-logo.png" // Replace this with the path to your logo image or SVG
            alt="Logo"
            style={{
              width: "60px", // Adjust the size of the logo
              height: "auto",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LogoWithLoader;
