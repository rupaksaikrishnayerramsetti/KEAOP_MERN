import { Typography, Grid, Paper, Divider, Box } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  alerttype,
  formatDate,
  formatTime,
  upcomingAlerts,
} from "../../Remainder/Remainder.utility";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { RiseLoading } from "../../../Loading/RiseLoading";
import { grey } from "@mui/material/colors";
import { AvTimer, CalendarMonth, TimeToLeave } from "@mui/icons-material";
import { globalColors } from "../../../styles/Colors";
import React from "react";
import { BASE_URL } from "../../../constants";

export const AlertComponent = () => {
  const navigate = useNavigate();
  const [alerts, setAlert] = useState<alerttype[]>([]);
  const [alertCount, setalertCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hoveredAlert, setHoveredAlert] = useState<number | null>(null);

  const alertcircleStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "8rem",
  };

  const fetchAlerts = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/fetchAlerts`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      console.log(response.data);
      const activeAlerts = upcomingAlerts(response.data["data"]);
      setTotalCount(response.data["data"].length);
      setalertCount(activeAlerts.length);
      setAlert(activeAlerts);
      console.log(totalCount, alertCount);
    } catch (error) {
      console.log(error);
    }
  };

  const alertpercentage = (alerts.length / totalCount) * 100;
  console.log(alertpercentage);

  const customAlertsStyles = {
    path: {
      stroke: `rgba(77,45,183, ${alertpercentage / 100})`,
    },
    text: {
      fill: "#000",
      fontSize: "3rem",
      fontWeight: "bold",
    },
  };
  useEffect(() => {
    fetchAlerts();
  }, [alertCount]);
  return (
    <Box>
      <Typography
        sx={{ textAlign: "left", marginLeft: "3%", fontWeight: "bold" }}
        variant="h4"
      >
        Remainders
      </Typography>
      <Box sx={{ padding: "3rem" }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <img
              src="/assets/notfound/no-data-found-3.png"
              alt="No notes found"
              style={{ width: window.innerWidth > 500 ? "45vw" : "80vw" }}
            />
          </div>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} lg={3} key={"active-ic"}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2.6rem 2rem",
                  backgroundColor: "white",
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  borderRadius: "3rem",
                }}
              >
                <Typography variant="h5"> Active Tasks</Typography>
                <Box sx={{ width: "10rem" }}>
                  <CircularProgressbar
                    value={alertpercentage}
                    text={`${alertCount}`}
                    styles={customAlertsStyles}
                  />
                </Box>
              </Box>
            </Grid>
            {alerts
              .filter((alert) => alert) // Filter out any empty or falsy alerts
              .slice(0, 3) // Take the first 3 alerts
              .map((alert) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={alert.alert_id}
                  onMouseEnter={() => {
                    setHoveredAlert(alert.alert_id);
                  }}
                  onMouseLeave={() => {
                    setHoveredAlert(null);
                  }}
                >
                  <Box
                    sx={{
                      padding: "3.5rem 2rem",
                      textAlign: "center",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      transform:
                        hoveredAlert === alert.alert_id
                          ? "scale(1.05)"
                          : "scale(1)",
                      borderRadius: "3rem",
                      wordBreak: "break-word",
                      height: "24vh",
                      backgroundColor: "white",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                    >
                      {alert.title}
                    </Typography>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CalendarMonth />
                      <Typography variant="h6">
                        {formatDate(alert.date)}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AvTimer />
                      <Typography variant="h6">
                        {formatTime(alert.time)}
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
