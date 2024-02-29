import { type } from "os";

export type FormDatatype = {
  email: string;
  gender: string;
  occupation: string;
  phone_number: string;
  salary: string;
  user_name: string;
};

export type Errorstype = {
  email?: string;
  gender?: string;
  occupation?: string;
  phone_number?: string;
  salary?: string;
  user_name?: string;
};

export type Loginflagpropstype = {
  setisloginflag: React.Dispatch<React.SetStateAction<boolean>>;
  isloginflag: boolean;
};

export type signinflagpropstype = {
  setisloginflag: React.Dispatch<React.SetStateAction<boolean>>;
  setisusercreated: React.Dispatch<React.SetStateAction<boolean>>;
  isloginflag: boolean;
};

export type inputdatatype = {
  type: string;
  label: string;
  name: string;
  placeholder: string;
};

export type LoginFormDatatype = {
  email: string;
  password: string;
};

export type LoginFormDataErrors = {
  email?: string;
};

export type loginValidateProps = {
  formData: LoginFormDatatype;
};

export type Snackbartype = {
  flag: boolean;
  setflag: React.Dispatch<React.SetStateAction<boolean>>;
  msg: string;
  msgtype: string;
};

export type FormData = {
  email?: string;
  gender: string;
  occupation: string;
  phone_number: string;
  salary: string;
  user_name: string;
};

export type Errors = {
  email?: string;
  gender?: string;
  occupation?: string;
  phone_number?: string;
  salary?: string;
  user_name?: string;
};

export type ValidateProps = {
  formData: FormData;
};
