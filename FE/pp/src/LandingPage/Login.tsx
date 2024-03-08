import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  IconButton,
  InputAdornment,
  Modal,
  Divider,
} from "@mui/material";
import { styles, forgotPasswordModelStyle } from "./Landing.styles";
import {
  LoginFormDataErrors,
  LoginFormDatatype,
  Loginflagpropstype,
} from "./Landing.type";
import { CloseSharp, Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { loginFormValidation } from "./Validations/validatedata";
import axios from "axios";
import SnackbarNotification from "../Notification_and_Loading/SnackbarNotification";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../CustomeTextfield";
import { globalbuttonstyle } from "../styles/Colors";
import { BASE_URL } from "../constants";
import { closeiconstyle } from "../Home/Note/Note.style";

const Login = ({ setisloginflag, isloginflag }: Loginflagpropstype) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setErrors] = useState<LoginFormDataErrors>({});
  const [isNotValid, setisNotValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [forgotPasswordFlag, setForgotPasswordFlag] = useState(false)
  const [formObj, setformObj] = useState<LoginFormDatatype>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const CheckCredentials = async () => {
    try {
      const send_credentials = await axios.post(
        `${BASE_URL}/loginCheck`,
        formObj
      );
      if (send_credentials.data !== "invalid") {
        localStorage.setItem("jwt_token", send_credentials.data);
        if (!!localStorage.getItem("jwt_token")) {
          navigate("/home");
        }
      } else {
        setisNotValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ForgotPassword = async () => {
    try{
      const response = await axios.post(`${BASE_URL}/forgotPassword`, {"email":userEmail});
      console.log(response.data)
      if(response.data)
      setForgotPasswordFlag(response.data)
      else{
        setisNotValid(true)
      }
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUserEmail("");
    setEmailError("");
  };

  const handleForgotPasswordSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(userEmail);
    if(emailError===""){
      ForgotPassword();
    }
  };

  function handleForgotPasswordChange(e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) {
    e.preventDefault();
    let tempEmail = e.target.value;
    setUserEmail(tempEmail)
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailError(!regex.test(tempEmail)?"Invalid Email format":"")
  } 

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (Object.keys(inputErrors).length === 0) {
      CheckCredentials();
    }
  };

  function handleChange(e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) {
    e.preventDefault();
    let formData: LoginFormDatatype = {
      ...formObj,
      [e.target.name]: e.target.value,
    };
    setformObj(formData);
    let errors = loginFormValidation({ formData });
    setErrors(errors);
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SnackbarNotification
          flag={isNotValid}
          setflag={setisNotValid}
          msg="Invalid Login Credentials"
          msgtype="error"
        />
        <SnackbarNotification
          flag={forgotPasswordFlag}
          setflag={setForgotPasswordFlag}
          msg="Your New Login Credentials are sent to your Mail"
          msgtype="success"
        />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={forgotPasswordModelStyle}>
            <IconButton sx={closeiconstyle}>
              <CloseSharp onClick={handleClose} />
            </IconButton>
            <Typography variant="h6" component="h2">
                Forgot Password
              </Typography>
              <Divider sx={{ my: 2 }} />
              <form onSubmit={handleForgotPasswordSubmit}>
                <TextField
                fullWidth
                type="search"
                label="Email"
                variant="outlined"
                name="email"
                value={userEmail}
                placeholder="Enter your Registered Mail"
                onChange={handleForgotPasswordChange}
                error={emailError!==""}
                helperText={emailError || ""}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                />
                <Button type="submit" variant="contained" sx={globalbuttonstyle}>
                  Submit
                </Button>
              </form>
            </Box>
          </Modal>
        <Typography component="h1" variant="h3" sx={styles.heading}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <CustomTextField
            fullWidth={true}
            label={"User Email"}
            name={"email"}
            placeholder={"Enter your Email id"}
            variant={"outlined"}
            margin={"normal"}
            size={"medium"}
            handleChange={handleChange}
            error={"email" in inputErrors}
            helperText={inputErrors["email"] || ""}
            sx={{ width: "40vh" }}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <CustomTextField
            fullWidth={true}
            type={showPassword ? "text" : "password"}
            label={"Password"}
            name={"password"}
            placeholder={"Enter your Password"}
            variant={"outlined"}
            margin={"normal"}
            size={"medium"}
            handleChange={handleChange}
            sx={{ width: "40vh" }}
            required={true}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // sx={globalbuttonstyle}
            sx={{ marginTop: 3, marginBottom: 2, width: "40vh" }}
          >
            Login
          </Button>
        </Box>
        <Typography component="h1" variant="h6">
          Don't have account ?
          <Button
            variant="text"
            onClick={() => {
              setisloginflag(!isloginflag);
            }}
          >
            Create Account
          </Button>
        </Typography>
        <Typography component="h1" variant="h6">
          Click here if you 
        <Button
            variant="text"
            onClick={() => {
              setOpen(true);
            }}
          >
            Forgot Password ?
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
