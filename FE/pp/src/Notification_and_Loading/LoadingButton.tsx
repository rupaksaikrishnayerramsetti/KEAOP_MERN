import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { globalColors, globalbuttonstyle } from "../styles/Colors";

const DownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const buttonStyles = {
    backgroundColor: globalColors.navbarcolor,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: globalbuttonstyle,
    },
  };

  const iconStyles = {
    marginRight: "8px",
  };

  const handleDownloadClick = () => {
    setIsLoading(true);

    // Simulate a download process (you can replace this with your actual download logic)
    setTimeout(() => {
      setIsLoading(false);
      setIsDone(true);

      // Reset to initial state after 3 seconds
      setTimeout(() => {
        setIsDone(false);
      }, 3000);
    }, 2000); // Simulated loading time

    // You can add your download logic here (e.g., fetch data, save files, etc.)
  };

  return (
    <Button
      onClick={handleDownloadClick}
      variant="contained"
      color="primary"
      sx={buttonStyles}
      endIcon={
        isLoading ? (
          <CircularProgress size={20} color="inherit" sx={iconStyles} />
        ) : isDone ? (
          <DownloadDoneIcon sx={iconStyles} />
        ) : (
          <FileDownloadOutlinedIcon sx={iconStyles} />
        )
      }
    >
      {/* {isLoading ? "Downloading..." : isDone ? "Done" : "Download"} */}
    </Button>
  );
};

export default DownloadButton;
