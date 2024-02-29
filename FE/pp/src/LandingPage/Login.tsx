import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styles } from "./Landing.styles";
import {
  LoginFormDataErrors,
  LoginFormDatatype,
  Loginflagpropstype,
} from "./Landing.type";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { loginFormValidation } from "./Validations/validatedata";
import axios from "axios";
import SnackbarNotification from "../Notification_and_Loading/SnackbarNotification";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../CustomeTextfield";
import { globalbuttonstyle } from "../styles/Colors";
import { BASE_URL } from "../constants";

const Login = ({ setisloginflag, isloginflag }: Loginflagpropstype) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setErrors] = useState<LoginFormDataErrors>({});
  const [isNotValid, setisNotValid] = useState(false);
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
      </Box>
    </Container>
  );
};

export default Login;
