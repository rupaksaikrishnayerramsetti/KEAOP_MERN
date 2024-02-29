import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styles } from "./Landing.styles";
import {
  FormDatatype,
  Errorstype,
  signinflagpropstype,
  inputdatatype,
} from "./Landing.type";
import { validateData } from "./Validations/validatedata";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import SnackbarNotification from "../Notification_and_Loading/SnackbarNotification";
import { Loading } from "../Notification_and_Loading/Loading";
import { inputdata, options } from "./Inputdata";
import CustomTextField from "../CustomeTextfield";
import { BASE_URL } from "../constants";

const Signup = ({
  setisloginflag,
  isloginflag,
  setisusercreated,
}: signinflagpropstype) => {
  const [formObj, setformObj] = useState<FormDatatype>({
    email: "",
    gender: "",
    occupation: "",
    phone_number: "",
    salary: "",
    user_name: "",
  });
  const [isemailexist, setisemailexist] = useState(false);
  const [isloading, setisloading] = useState(false);

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

  const CreateUser = async () => {
    setisloading(true);
    try {
      const created_success = await axios.post(
        `${BASE_URL}/createUser`,
        formObj
      );
      const result = created_success.data;
      console.log(created_success.data);
      if (result) {
        // setisemailexist(!isemailexist);
        setisloginflag(!isloginflag);
        setisusercreated(true);
      } else {
        setisemailexist(!isemailexist);
      }
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setisloading(false);
    }
  };

  const [inputErrors, setErrors] = useState<Errorstype>({});
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formObj["gender"] === "") {
      setErrors({ ...inputErrors, gender: "please select some value" });
    }
    if (Object.keys(inputErrors).length === 0) {
      CreateUser();
    }
  };

  function handleChange(e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) {
    e.preventDefault();
    let formData: FormDatatype = {
      ...formObj,
      [e.target.name]: e.target.value,
    };
    setformObj(formData);
    let errors = validateData({ formData });
    setErrors(errors);
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SnackbarNotification
          flag={isemailexist}
          setflag={setisemailexist}
          msg="This email is already exists please use another email."
          msgtype="error"
        />
        <Typography component="h1" variant="h3" sx={styles.heading}>
          Signup
        </Typography>
        {isloading ? (
          <Loading sizevalue={200} />
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            {inputdata.map((data: inputdatatype) => (
              <CustomTextField
                fullWidth={true}
                type={data.type}
                label={data.label}
                name={data.name}
                placeholder={data.placeholder}
                variant={"outlined"}
                margin={"normal"}
                size={"medium"}
                handleChange={handleChange}
                error={data.name in inputErrors}
                helperText={inputErrors[data.name as keyof Errorstype] || ""}
                sx={{ width: "40vh", padding: "0", marginBottom: "0.1rem" }}
                required={true}
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
              <InputLabel id="Gender_label">Select yout Gender</InputLabel>
              <Select
                id="Gender_select"
                labelId="Gender"
                name="gender"
                variant="outlined"
                data-testid="select_test"
                label="Select Your Gender"
                sx={{ width: "40vh", textAlign: "left" }}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "40vh" }}
            >
              Signup
            </Button>
            <Typography component="h1" variant="h6">
              Already had an account ?
              <Button
                variant="text"
                onClick={() => setisloginflag(!isloginflag)}
              >
                Login
              </Button>
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Signup;
