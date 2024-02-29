import {
  Grid,
  Typography,
  Button,
  Divider,
  Modal,
  TextField,
  InputAdornment,
  Box,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Popover,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { validateAlertData } from "../Validations/validateAlertData";
import { Loading } from "../../Notification_and_Loading/Loading";
import { style, closeiconstyle, gridStyles } from "./Remainder.style";
import {
  active,
  alertformtype,
  alerttype,
  completedAlerts,
  FormErrortype,
  InactiveStyle,
  reset,
  showsearchedalerts,
  upcomingAlerts,
  Remainderprops,
  today,
} from "./Remainder.utility";
import { formatDate, formatTime } from "./Remainder.utility";
import CustomTextField from "../../CustomeTextfield";
import { CloseSharp } from "@mui/icons-material";
import { globalColors, globalbuttonstyle } from "../../styles/Colors";
import React from "react";
import { BASE_URL } from "../../constants";

export const Remainder = ({ alertCount, setalertCount }: Remainderprops) => {
  const [open, setOpen] = useState(false);
  const [alertId, setAlertId] = useState(0);
  const [deleteflag, setDeleteFlag] = useState(false);
  const [modelButton, setModelButton] = useState("Add Remainder");
  const [alerts, setAlert] = useState<alerttype[]>([]);
  const [globalAlerts, setGlobalAlert] = useState<alerttype[]>([]);
  const [formObj, setformObj] = useState<alertformtype>(reset);
  const [error, setError] = useState<FormErrortype>({});
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [upComing, setUpComing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    alert_id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setAlertId(alert_id);
  };

  const handleancherClose = () => {
    setAnchorEl(null);
  };

  const ancheropen = Boolean(anchorEl);

  const handleOpen = () => {
    setModelButton("Add Remainder");
    setOpen(true);
  };

  const handleClose = () => {
    setformObj(reset);
    setError({});
    // fetchAllAlerts();
    setOpen(false);
  };

  const handledeletepopupOpen = (alert: alerttype) => {
    setDeletePopUp(true);
    setAlertId(alert.alert_id);
    handleancherClose();
  };
  const handledeletepopupClose = () => {
    setDeletePopUp(false);
    setAlertId(0);
  };

  const createAlert = async () => {
    try {
      let formData = { ...formObj, token: localStorage.getItem("jwt_token") };
      const created_note = await axios.post(
        `${BASE_URL}/createAlert`,
        formData
      );
      const result = created_note.data;
      fetchAllAlerts();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllAlerts = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/fetchAllAlerts`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      const updatedArrayOfObjects = response.data.map((obj: { [x: string]: any; _id: any; }) => {
        // Destructure _id from the object and rename it to note_id
        const { _id: alert_id, ...rest } = obj;
        // Return a new object with note_id and other properties
        return { alert_id, ...rest };
      });
      setGlobalAlert(updatedArrayOfObjects);
      console.log(updatedArrayOfObjects);
      const activeAlerts = upcomingAlerts(updatedArrayOfObjects);
      setalertCount(activeAlerts.length);
      setDeleteFlag(false);
      setAlert(activeAlerts);
    } catch (error) {
      console.log(error);
    }
  };

  const editAlert = async () => {
    try {
      let formData = { ...formObj, token: localStorage.getItem("jwt_token") };
      const edited_note = await axios.post(
        `${BASE_URL}/editAlert`,
        formData
      );
      const result = edited_note.data;
      fetchAllAlerts();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAlert = async (alert_id: number) => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      console.log(alert_id);
      const response = await axios.delete(`${BASE_URL}/deleteAlert`, {
        headers: {
          Authorization: `${jwt_token}`,
          alertId: alert_id,
        },
      });
      console.log(response.data);
      setDeleteFlag(true);
      fetchAllAlerts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (alert: alerttype) => {
    setModelButton("Edit Remainder");
    setAlertId(alert.alert_id);
    alert["time"] =
      alert["time"].length === 5 ? alert["time"] : `0${alert.time}`;
    setformObj(alert);
    setOpen(true);
    setUpComing(true);
    handleancherClose();
  };

  const handleDelete = () => {
    deleteAlert(alertId);
    setUpComing(true);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let formData: alertformtype = formObj;
    let errors = validateAlertData({ formData });
    setError(errors);
    if (Object.keys(errors).length === 0) {
      console.log(formObj);
      console.log("Yrsk", alertId);
      if (alertId || modelButton == "EDIT THE Remainder") {
        editAlert();
      } else {
        createAlert();
      }
      setformObj(reset);
      handleClose();
    }
  };

  const handleChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    let formData: alertformtype = {
      ...formObj,
      [e.target.name]: e.target.value,
    };
    setformObj(formData);
    let errors = validateAlertData({ formData });
    setError(errors);
  };

  const handlesearchChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const searched_alerts = showsearchedalerts(
      upComing ? upcomingAlerts(globalAlerts) : completedAlerts(globalAlerts),
      e.target.value.trim()
    );
    setAlert(searched_alerts);
  };

  useEffect(() => {
    // if (!open || deleteflag) {
    // }
    fetchAllAlerts();
  }, []);

  useEffect(() => {}, [alerts]);

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
        }}
      >
        <Loading sizevalue={300} />
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: "4rem",
        height: "100%",
        backgroundColor: globalColors.backgroundcolor,
      }}
    >
      <Grid item xs={12} sx={{ padding: "1rem", marginTop: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            style={{ marginRight: "16px", fontWeight: "bold" }}
          >
            Remainders
          </Typography>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <CustomTextField
              fullWidth={true}
              type={"search"}
              sx={{ width: "18rem" }}
              variant={"outlined"}
              name={"alertSearch"}
              placeholder={"Search based on Title"}
              handleChange={handlesearchChange}
              margin={"normal"}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Button
              variant={!upComing ? "outlined" : "contained"}
              color="success"
              sx={active(upComing)}
              onClick={() => {
                setUpComing(true);
                setAlert(upcomingAlerts(globalAlerts));
              }}
            >
              Active
            </Button>
            <Button
              variant={upComing ? "outlined" : "contained"}
              color="warning"
              sx={InactiveStyle(upComing)}
              onClick={() => {
                setUpComing(false);
                setAlert(completedAlerts(globalAlerts));
              }}
            >
              Inactive
            </Button>
            <IconButton onClick={handleOpen} sx={globalbuttonstyle}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={closeiconstyle}>
            <CloseSharp onClick={handleClose} />
          </IconButton>
          <Typography variant="h6" component="h2">
            {modelButton === "Add Remainder" ? "ADD A NEW Remainder" : "EDIT THE Remainder"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <CustomTextField
              fullWidth={true}
              type={"search"}
              label={"Title"}
              variant={"outlined"}
              name={"title"}
              value={formObj["title"]}
              placeholder={"Enter your Title"}
              handleChange={handleChange}
              error={"title" in error}
              helperText={error["title"] || ""}
              margin={"normal"}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SubtitlesIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth={true}
              type={"date"}
              label={"Select Date"}
              variant={"outlined"}
              name={"date"}
              value={formObj["date"]}
              onChange={handleChange}
              error={"date" in error}
              helperText={error["date"] || ""}
              margin={"normal"}
              required={true}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: today,
              }}
            />
            <CustomTextField
              fullWidth={true}
              type={"time"}
              label={"Select Time"}
              variant={"outlined"}
              name={"time"}
              value={formObj["time"]}
              handleChange={handleChange}
              error={"time" in error}
              helperText={error["time"] || ""}
              margin={"normal"}
              required={true}
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" sx={globalbuttonstyle}>
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal
        open={deletePopUp}
        onClose={handledeletepopupClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to delete the Remainder?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button
            variant="contained"
            sx={globalbuttonstyle}
            style={{ marginRight: 8 }}
            onClick={() => {
              handleDelete();
              handledeletepopupClose();
            }}
          >
            YES
          </Button>
          <Button
            variant="contained"
            sx={globalbuttonstyle}
            onClick={() => handledeletepopupClose()}
          >
            NO
          </Button>
        </Box>
      </Modal>
      {alerts.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "74.6vh",
          }}
        >
          <img
            src="/assets/notfound/no-data-found-3.png"
            alt="No alerts found"
            style={{
              width: window.innerWidth > 500 ? "45vw" : "100vw",
            }}
          />
        </div>
      ) : (
        alerts.map((alert, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={alert.alert_id}
            style={gridStyles}
            onMouseEnter={() => {
              setHoveredNote(alert.alert_id);
            }}
            onMouseLeave={() => {
              setHoveredNote(null);
            }}
          >
            <Card
              sx={{
                maxWidth: "80vw",
                height: "32rem",
                padding: "1rem",
                transform:
                  hoveredNote === alert.alert_id ? "scale(1.05)" : "scale(1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardHeader
                sx={{ padding: 0, margin: 0 }}
                avatar={
                  <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                    {alert.title[0]}
                  </Avatar>
                }
                subheader={
                  <h2 style={{ wordBreak: "break-all" }}>{alert.title}</h2>
                }
                action={
                  <IconButton onClick={(e) => handleClick(e, index)}>
                    <MoreVertIcon />
                  </IconButton>
                }
              />

              <Popover
                open={ancheropen}
                anchorEl={anchorEl}
                onClose={handleancherClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Box sx={{ padding: "16px" }}>
                  <IconButton
                    color="success"
                    onClick={() => handleEdit(alerts[alertId])}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={() => handledeletepopupOpen(alerts[alertId])}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Popover>
              <CardContent>
                <Typography variant="subtitle1">
                  {formatDate(alert.date)}, {formatTime(alert.time)}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={`/assets/alerts/alert${index % 18}.jpg`}
                alt="alert img"
                sx={{ flex: 1, width: "100%", maxHeight: "70%" }}
              />
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};
