// import { Divider, Typography } from "@mui/material";
import { Profile } from "../Profile/Profile";
import { Box } from "@mui/system";
import "react-circular-progressbar/dist/styles.css";
import { NoteComponent } from "./Components/NoteComponent";
import { AlertComponent } from "./Components/AlertComponet";
import {  maincontainer, rightbox } from "./Home.style";
import { SpentComponent } from "./Components/SpentComponent";
import { useEffect, useState } from "react";
import { Loading } from "../../Notification_and_Loading/Loading";
import { globalColors } from "../../styles/Colors";
import React from "react";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: globalColors.backgroundcolor,
        }}
      >
        <Loading sizevalue={300} />
      </Box>
    );
  }

  return (
    <Box sx={maincontainer}>
      <Profile />
      <Box sx={rightbox}>
        <Box>
          <AlertComponent />
        </Box>
        <Box>
          <NoteComponent />
        </Box>
        <Box>
          <SpentComponent />
        </Box>
      </Box>
    </Box>
  );
};
