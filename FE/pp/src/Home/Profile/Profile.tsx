import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Visibility, VisibilityOff, Work, YouTube } from "@mui/icons-material";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { validateData } from "../../LandingPage/Validations/validatedata";
import PasswordIcon from "@mui/icons-material/Password";
import LockResetIcon from "@mui/icons-material/LockReset";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import SnackbarNotification from "../../Notification_and_Loading/SnackbarNotification";
import {
  checkForEmpty,
  validateProfile,
} from "../Validations/validateProfileData";
import {
  formobjtype,
  reset,
  globalformobjtype,
  globalreset,
  passwordchangetype,
  resetpass,
  Errorstype,
  ProfileErrorPropstype,
  inputdata,
  inputdatatype,
  options,
  socialmediaiconsgroupstyling,
} from "./Profile.utility";
import {
  facebookiconstyle,
  twittericonstyle,
  linkediniconstyle,
  youtubeiconstyle,
  maindivstyle,
  profilecardstyle,
  profileimgstyle,
  interdivforcontent,
  interdivcontentelement,
} from "./Profile.style";
import CustomTextField from "../../CustomeTextfield";
import { height, margin } from "@mui/system";
import { globalColors, globalbuttonstyle } from "../../styles/Colors";
import { BASE_URL } from "../../constants";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Profile = () => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [formObj, setformObj] = useState<formobjtype>(reset);
  const [globalObj, setGlobalObj] = useState<globalformobjtype>(globalreset);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passchangeObj, setpasschangeObj] =
    useState<passwordchangetype>(resetpass);
  const [inputErrors, setErrors] = useState<Errorstype>({});
  const [passwordErrors, setPasswordErrors] = useState<ProfileErrorPropstype>(
    {}
  );
  const [passwordchangesuccess, setpasswordchangsuccess] = useState(false);
  const [passwordchangefailed, setpasswordchangefailed] = useState(false);

  const fetchuserdetails = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      // const response = await axios.get("http://localhost/fetchUserDetails", {
      //   headers: {
      //     Authorization: `${jwt_token}`,
      //   },
      // });
      const response = await axios.get(`${BASE_URL}/fetchUserDetails`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      console.log(response.data);
      // setformObj(response.data[0]);
      // setGlobalObj(response.data[0]);
      setformObj(response.data);
      setGlobalObj(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async () => {
    try {
      let formData = { ...formObj, token: localStorage.getItem("jwt_token") };
      const data_updated = await axios.post(
        `${BASE_URL}/updateUserData`,
        formData
      );
      handleSaveUserDetails();
      // const result = data_updated.data;
      console.log(data_updated.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async () => {
    try {
      let formData = {
        ...passchangeObj,
        token: localStorage.getItem("jwt_token"),
      };
      const password_changed = await axios.post(
        `${BASE_URL}/changePassword`,
        formData
      );
      console.log(password_changed.data);
      if (password_changed.data) {
        setpasswordchangsuccess(true);
      } else {
        setpasswordchangefailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle opening and closing of edit dialog
  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setErrors({});
    setEditDialogOpen(false);
  };

  // Function to handle opening and closing of password change dialog
  const handlePasswordDialogOpen = () => {
    setPasswordDialogOpen(true);
  };

  const handlePasswordDialogClose = () => {
    setpasschangeObj(resetpass);
    setPasswordErrors({});
    setPasswordDialogOpen(false);
  };

  // Function to save edited user details
  const handleSaveUserDetails = () => {
    setEditDialogOpen(false);
  };

  function selectIcon(icon: string) {
    switch (icon) {
      case "user_name":
        return <PersonIcon />;
      case "email":
        return <EmailIcon />;
      case "phone_number":
        return <PhoneIcon />;
      case "occupation":
        return <WorkIcon />;
      case "salary":
        return <CurrencyRupeeIcon />;
    }
  }

  const handleMousehover = (
    e: React.MouseEvent<Element>,
    scaleValue: string,
    color: string
  ) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = `scale(${scaleValue})`;
    target.style.color = color;
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formObj);
    if (formObj["gender"] === "") {
      setErrors({ ...inputErrors, gender: "please select some value" });
    }
    if (Object.keys(inputErrors).length === 0) {
      
      updateUserData();
    }
  };

  const handleChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    let formData: formobjtype = {
      ...formObj,
      [e.target.name]: e.target.value,
    };
    setformObj(formData);
    console.log(formData);
    let errors = validateData({ formData });
    setErrors(errors);
  };

  const handlepasswordSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(passchangeObj);
    const errors: ProfileErrorPropstype = checkForEmpty(passchangeObj);
    setPasswordErrors(errors);
    if (
      Object.keys(passwordErrors).length === 0 &&
      Object.keys(errors).length === 0
    ) {
      changePassword();
      handlePasswordDialogClose();
    }
  };

  const handlePasswordChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    if (e.target.value.length <= 32) {
      let passchange: passwordchangetype = {
        ...passchangeObj,
        [e.target.name]: e.target.value,
      };
      setpasschangeObj(passchange);
      let errors: ProfileErrorPropstype = validateProfile(passchange);
      setPasswordErrors(errors);
    }
  };

  useEffect(() => {
    if (!editDialogOpen) {
      fetchuserdetails();
    }
  }, [editDialogOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100vh",
        height: {
          lg: "94vh",
        },
        flexGrow: 1,
      }}
    >
      <SnackbarNotification
        flag={passwordchangesuccess}
        setflag={setpasswordchangsuccess}
        msg="Password successfully changed."
        msgtype="success"
      />
      <SnackbarNotification
        flag={passwordchangefailed}
        setflag={setpasswordchangefailed}
        msg="Old password is wrong try again."
        msgtype="error"
      />
      <Box
        sx={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          borderRadius: "2rem",
          textAlign: "center",
          padding: "1rem",
          margin: "1rem",
          backgroundColor: "white",
          // width:"100%"
        }}
      >
        <Box>
          <Box>
            <img
              src={`/assets/gender/${globalObj["gender"]}.jpg`}
              alt="Profile"
              style={profileimgstyle}
            />
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {globalObj["user_name"]}
            </Typography>
            <Typography variant="body1" sx={{ color: globalColors.normaltext }}>
              {globalObj["email"]}
            </Typography>

            <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1.6rem",
                }}
              >
                <PhoneIcon />
                <Work />
                <CurrencyRupeeIcon />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  rowGap: "1rem",
                  color: "#adadad",
                }}
              >
                <Typography
                  sx={{ color: globalColors.normaltext }}
                  variant="h6"
                  noWrap
                >
                  +91 {globalObj["phone_number"]}
                </Typography>
                <Typography
                  sx={{ color: globalColors.normaltext }}
                  variant="h6"
                >
                  {" "}
                  {globalObj["occupation"]}
                </Typography>
                <Typography
                  sx={{ color: globalColors.normaltext }}
                  variant="h6"
                >
                  {formatter.format(parseInt(globalObj["salary"])).slice(1)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "2rem" }}>
              <Button
                variant="contained"
                sx={globalbuttonstyle}
                startIcon={<LockIcon />}
                onClick={handlePasswordDialogOpen}
                style={{
                  fontSize: "1.1rem",
                  width: "75%",
                }}
              >
                Change Password
              </Button>
              <Button
                variant="contained"
                sx={globalbuttonstyle}
                startIcon={<EditIcon />}
                onClick={handleEditDialogOpen}
                style={{
                  marginTop: "1rem",
                  fontSize: "1.1rem",
                  width: "75%",
                }}
              >
                Edit Profile
              </Button>
            </Box>
            <Box sx={socialmediaiconsgroupstyling}>
              <a href="https://www.facebook.com/" style={{ padding: "0.5rem" }}>
                <FacebookIcon
                  style={facebookiconstyle}
                  onMouseOver={(e: React.MouseEvent<Element, MouseEvent>) =>
                    handleMousehover(e, "1.2", "#0063E5")
                  }
                  onMouseOut={(e) => handleMousehover(e, "1", "#1877F2")}
                />
              </a>
              <a href="https://twitter.com/" style={{ padding: "0.5rem" }}>
                <TwitterIcon
                  style={twittericonstyle}
                  onMouseOver={(e) => handleMousehover(e, "1.2", "#0063E5")}
                  onMouseOut={(e) => handleMousehover(e, "1", "#1DA1F2")}
                />
              </a>
              <a href="https://www.linkedin.com/in/yerramsettirsaikrishna/" style={{ padding: "0.5rem" }}>
                <LinkedInIcon
                  style={linkediniconstyle}
                  onMouseOver={(e) => handleMousehover(e, "1.2", "#0063E5")}
                  onMouseOut={(e) => handleMousehover(e, "1", "#0077B5")}
                />
              </a>
              <a href="https://www.youtube.com/" style={{ padding: "0.5rem" }}>
                <YouTube
                  style={youtubeiconstyle}
                  onMouseOver={(e) => handleMousehover(e, "1.2", "darkred")}
                  onMouseOut={(e) => handleMousehover(e, "1", "red")}
                />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        TransitionComponent={Transition}
        open={editDialogOpen}
        // keepMounted
        aria-describedby="alert-dialog-slide-description"
        onClose={handleEditDialogClose}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ backgroundColor: globalColors.modelcolor }}>
          <DialogTitle>Edit User Details</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {inputdata.map((data: inputdatatype) => (
                  <CustomTextField
                    key={data.name}
                    fullWidth={true}
                    type={data.type}
                    label={data.label}
                    name={data.name}
                    value={formObj[data.name as keyof formobjtype]}
                    placeholder={data.placeholder}
                    variant={"outlined"}
                    margin={"normal"}
                    size={"medium"}
                    sx={{ marginBottom: "1rem" }}
                    required={true}
                    handleChange={handleChange}
                    error={data.name in inputErrors}
                    helperText={
                      inputErrors[data.name as keyof Errorstype] || ""
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {selectIcon(data.name)}
                        </InputAdornment>
                      ),
                    }}
                  />
                ))}
                <FormControl variant="outlined" required>
                  <InputLabel id="Gender_label">Select your Gender</InputLabel>
                  <Select
                    id="Gender_select"
                    labelId="Gender_label"
                    name="gender"
                    value={formObj["gender"]}
                    variant="outlined"
                    label="Select Your Gender"
                    sx={{ marginBottom: "1rem" }}
                    required
                    onChange={handleChange}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {"gender" in inputErrors && (
                    <span className="errorradio">
                      {inputErrors["gender"] || ""}
                    </span>
                  )}
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={globalbuttonstyle}
                onClick={handleEditDialogClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={globalbuttonstyle}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>

      <Dialog open={passwordDialogOpen} onClose={handlePasswordDialogClose}>
        <Box sx={{ backgroundColor: globalColors.modelcolor }}>
          <DialogTitle>
            Change Password
            <Tooltip
              sx={{ marginLeft: "0.3rem" }}
              title="You can set only a maximum of 32 characters for your password"
            >
              <InfoIcon fontSize="small" color="primary" />
            </Tooltip>
          </DialogTitle>
          <form onSubmit={handlepasswordSubmit}>
            <DialogContent>
              <CustomTextField
                key={"password"}
                fullWidth={true}
                type={showPassword ? "text" : "password"}
                label={"Old Password"}
                name={"password"}
                placeholder={"Enter your old password"}
                value={passchangeObj["password"]}
                error={"password" in passwordErrors}
                helperText={passwordErrors["password"]}
                variant={"outlined"}
                margin={"normal"}
                size={"medium"}
                sx={{ marginBottom: "1rem" }}
                required={true}
                handleChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <CustomTextField
                key={"newpassword"}
                fullWidth={true}
                type={showNewPassword ? "text" : "password"}
                label={"New Password"}
                name={"newpassword"}
                placeholder={"Enter your new password"}
                value={passchangeObj["newpassword"]}
                error={"newpassword" in passwordErrors}
                helperText={passwordErrors["newpassword"]}
                variant={"outlined"}
                margin={"normal"}
                size={"medium"}
                sx={{ marginBottom: "1rem" }}
                required={true}
                handleChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <LockResetIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <CustomTextField
                key={"confirmpassword"}
                fullWidth={true}
                type={showConfirmPassword ? "text" : "password"}
                label={"Confirm New Password"}
                name={"confirmpassword"}
                placeholder={"Enter your confirm password"}
                value={passchangeObj["confirmpassword"]}
                error={"confirmpassword" in passwordErrors}
                helperText={passwordErrors["confirmpassword"]}
                variant={"outlined"}
                margin={"normal"}
                size={"medium"}
                sx={{ marginBottom: "1rem" }}
                required={true}
                handleChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <LockResetIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={globalbuttonstyle}
                onClick={handlePasswordDialogClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={globalbuttonstyle}
                onClick={handlepasswordSubmit}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </Box>
  );
};
