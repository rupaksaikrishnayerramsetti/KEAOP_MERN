type passwordchangetype = {
    password: string;
    newpassword: string;
    confirmpassword: string;
  };

type ProfileErrorPropstype = {
    password?: string;
    newpassword?: string;
    confirmpassword?: string;
}

export const validateProfile = ( passwordobj:passwordchangetype ) => {
    let errors: ProfileErrorPropstype = {};
    let regex: RegExp;
    Object.entries(passwordobj).forEach(([key, value]) => {
        switch (key) {
            case "newpassword":
                if (value !== "") {
                    regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    const temp = value.trim();
                    if (temp === "") {
                        errors["newpassword"] = "*Required field";
                    } else if (temp.length < 8) {
                        errors["newpassword"] = "You have to use a password of at least 8 characters";
                    } else if (!regex.test(temp)) {
                        errors["newpassword"] = "keep strong password with caps, smalls, numbers and special chars each";
                    }
                }
                break;
            case "password":
                if (value !== "") {
                    // regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    const temp = value.trim();
                    if (temp === "") {
                        errors["password"] = "*Required field";
                    }
                    // } else if (temp.length < 8) {
                    //     errors["password"] = "You have to use a password of at least 8 characters";
                    // } else if (!regex.test(temp)) {
                    //     errors["password"] = "your password may contains caps, smalls, numbers and special chars";
                    // }
                }
                break;
            case "confirmpassword":
                if (value !== "") {
                    const temp = value.trim();
                    if (temp === "") {
                        errors['confirmpassword'] = "*Required field";
                    }else if (temp !== passwordobj['newpassword']) {
                        errors['confirmpassword'] = "Password don't match"
                    }
                }
        }
    });
    return errors;
}

export const checkForEmpty = (passwordobj: passwordchangetype) => {
    let errors: ProfileErrorPropstype = {};
    if (passwordobj["password"].trim() === "") {
        errors['password'] = "*Required field";
    } 
    if (passwordobj['newpassword'].trim() === "") {
        errors['newpassword'] = "*Required field";
    }
    if (passwordobj['confirmpassword'].trim() === "") {
        errors['confirmpassword'] = "*Required field";
    } else if (passwordobj['confirmpassword'] !== passwordobj['newpassword']) {
        errors['confirmpassword'] = "Password don't match"
    }
    return errors;
}