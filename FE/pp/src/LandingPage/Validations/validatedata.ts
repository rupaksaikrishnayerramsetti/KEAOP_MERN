import { LoginFormDataErrors, loginValidateProps, Errors, ValidateProps } from "../Landing.type";

export const validateData = ({ formData }: ValidateProps): Errors => {
  let errors: Errors = {};
  let regex: RegExp;

  Object.entries(formData).forEach(([key, value]) => {
    switch (key) {
        case "email":
            if (value !== "") {
                regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regex.test(value)) {
                    errors["email"] = "Invalid Email format";
                }
            }
        break;
        case "occupation":
            if (value !== "") {
                regex = /^[A-Za-z\s]+$/;
                if (!regex.test(value)) {
                    errors["occupation"] =
                        "Occupation can't have numbers or special characters";
                }
            }
        break;
        case "phone_number":
            if (value !== "") {
                regex = /^\d{10}$/;
                const reg1 = /^[0-9]+$/;
                const temp = value;
                if (temp.length !== 10 && reg1.test(temp)) {
                    errors["phone_number"] = "Phone number must have 10 digits";
                } else if (parseInt(value, 10) === 0) {
                    errors["phone_number"] = "Phone number shouldn't be 0";
                } else if (!regex.test(value)) {
                    errors["phone_number"] = "Invalid Phone number";
                }
            }
        break;
        case "salary":
            if (value !== "") {
                regex = /^[0-9]+$/;
                const salaryValue = parseInt(value, 10);
                if (!regex.test(value)) {
                    errors["salary"] =
                        "Salary can't have alphabets or special characters";
                } else if (salaryValue === 0) {
                    errors["salary"] = "Salary shouldn't be ₹0/-";
                } else if (salaryValue < 10000) {
                    errors["salary"] = "Salary must be at least ₹10000/-";
                } else if (salaryValue > 100000000) {
                    errors["salary"] = "Salary shouldn't be greater than ₹100000000/-";
                }
            }
        break;
        case "user_name":
            if (value !== "") {
                regex = /^[A-Za-z\s]+$/;
                if (!regex.test(value)) {
                    errors["user_name"] =
                        "User name can't have numbers or special characters";
                } else if (value.length < 3) {
                    errors["user_name"] = "User name should have min 3 characters"
                }
                 else if (value.length > 36) {
                    errors["user_name"] = "User name should only have max 36 characters"
                }
            }
        break;
    }
  });

  return errors;
};

export const loginFormValidation = ({ formData }: loginValidateProps) : LoginFormDataErrors => {
    let errors: Errors = {};
  let regex: RegExp;

  Object.entries(formData).forEach(([key, value]) => {
      switch (key) { 
          case "email":
            if (value !== "") {
                regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regex.test(value)) {
                    errors["email"] = "Invalid Email format";
                }
            }
        break;
      } 
  });
    return errors;
}