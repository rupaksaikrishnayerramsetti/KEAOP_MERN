export const inputdata = [
    {
      type: "text",
      label: "User Name",
      name: "user_name",
      placeholder: "Enter your Full name",
    },
    {
      type: "text",
      label: "Phone Number",
      name: "phone_number",
      placeholder: "Enter your new Phone Number",
    },
    {
      type: "text",
      label: "Occupation",
      name: "occupation",
      placeholder: "Enter your new Ocupation",
    },
    // {
    //   type: "text",
    //   label: "Salary (in Rs)",
    //   name: "salary",
    //   placeholder: "Enter your new Salary per Month",
    // },
];
  
export const cardcontent = [
    { title: "Phone No.:", value: "phone_number" },
    { title: "Occupation:", value: "occupation" },
    { title: "Gender:", value: "gender" },
    { title: "Salary:", value: "salary" }
];

export type cardcontenttype = {
    title: string;
    value: string;
}

export const options = ["Male", "Female", "Other"];

export type formobjtype = {
    user_name: string;
    // email: string;
    occupation: string;
    phone_number: string;
    gender: string;
    salary: string;
  };

export type globalformobjtype = {
    user_name: string;
    email: string;
    occupation: string;
    phone_number: string;
    gender: string;
    salary: string;
  };

export const reset = {
    user_name: "",
    occupation: "",
    phone_number: "",
    gender: "",
    salary: "",
  };

export const globalreset = {
    user_name: "",
    email: "",
    occupation: "",
    phone_number: "",
    gender: "",
    salary: "",
  };

export type passwordchangetype = {
    password: string;
    newpassword: string;
  confirmpassword: string;
  };

export type ProfileErrorPropstype = {
    password?: string;
  newpassword?: string;
  confirmpassword?: string;
  };

export const resetpass = {
    password: "",
  newpassword: "",
    confirmpassword: ""
  };

export type inputdatatype = {
    type: string;
    label: string;
    name: string;
    placeholder: string;
  };

export type Errorstype = {
    gender?: string;
    occupation?: string;
    phone_number?: string;
    salary?: string;
    user_name?: string;
};
  
export const socialmediaiconsgroupstyling = {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
}