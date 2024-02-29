import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { Snackbartype } from "../LandingPage/Landing.type";

export default function SnackbarNotification({
  flag,
  setflag,
  msg,
  msgtype,
}: Snackbartype) {
  const handleClose = () => {
    setflag(false);
  };
  const vertical = "top";
  const horizontal = "center";
  const mapMsgTypeToSeverity = (msgtype: string): AlertColor => {
    switch (msgtype) {
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "success":
        return "success";
      default:
        return "info";
    }
  };

  const severity = mapMsgTypeToSeverity(msgtype);

  return (
    <Snackbar
      open={flag}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={handleClose}
      >
        {msg}
      </MuiAlert>
    </Snackbar>
  );
}
