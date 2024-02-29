import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, CssBaseline, Box } from "@mui/material";
import Login from "./Login";
import { styles } from "./Landing.styles";
import Signup from "./Signup";
import SnackbarNotification from "../Notification_and_Loading/SnackbarNotification";

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [isloginflag, setisloginflag] = useState(true);
  const [isusercreated, setisusercreated] = useState(false);

  const imageUrls = [
    "/assets/landing/note1.jpg",
    "/assets/landing/note2.jpg",
    "/assets/landing/note3.jpg",
    "/assets/landing/note4.jpg",
    "/assets/landing/note5.jpg",
    "/assets/landing/note6.jpg",
    "/assets/landing/note7.jpg",
    "/assets/landing/note8.jpg",
    "/assets/landing/note9.jpg",
    "/assets/landing/note10.jpg",
  ];
  const rotateImages = () => {
    setCurrentImageIndex((currentImageIndex + 1) % 9);
  };
  useEffect(() => {
    const interval = setInterval(rotateImages, 5000);
    // console.log(imageUrls[currentImageIndex]);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex]);
  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Grid
        container
        component="main"
        sx={{
          padding: "5rem 1rem",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${imageUrls[currentImageIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1rem",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          sx={{
            borderRadius: "1rem",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
          elevation={6}
          square
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <SnackbarNotification
              flag={isusercreated}
              setflag={setisusercreated}
              msg="Account creation successfull and credentials sent to mail"
              msgtype="success"
            />
            <Grid item>
              {isloginflag ? (
                <Login
                  setisloginflag={setisloginflag}
                  isloginflag={isloginflag}
                />
              ) : (
                <Signup
                  setisloginflag={setisloginflag}
                  isloginflag={isloginflag}
                  setisusercreated={setisusercreated}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
