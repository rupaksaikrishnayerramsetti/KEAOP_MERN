type FormData = {
    spenttype: string;
    amount: string;
}

type SpentErrorPropstype = {
    spenttype?: string;
    amount?: string;
}

export const validateSpent = ( formData:FormData, savings:number) => {
    let errors: SpentErrorPropstype = {};
    let regex: RegExp;
    Object.entries(formData).forEach(([key, value]) => {
        switch (key) {
            case "amount":
                if (value !== "") {
                    // regex = /^[0-9-]+$/;
                    regex = /^[0-9]+$/;
                    const salaryValue = parseInt(value, 10);
                    // const savingsValue = parseInt(savings, 10);
                    if (!regex.test(value)) {
                        errors["amount"] =
                            "Amount can't have alphabets or special characters";
                    } else if (salaryValue === 0) {
                        errors["amount"] = "Amount shouldn't be ₹0/-";
                    }else if (salaryValue > savings) {
                        errors["amount"] = "Amount shouldn't be greater than Savings amount";
                    }
                }
                break;
        }
    });
    return errors;
}