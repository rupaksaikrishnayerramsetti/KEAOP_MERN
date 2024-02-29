import { error } from "console";

type FormData = {
        title: string;
        value: string;
    }

type ValidateNotePropstype = {
    formData: FormData;
}

type NoteErrorPropstype = {
    title?: string;
}

export const validateNoteData = ({ formData }: ValidateNotePropstype) => {
    let errors: NoteErrorPropstype = {};
    let regex: RegExp;
    Object.entries(formData).forEach(([key, value]) => {
        switch (key) {
            case "title":
                const temp = value;
                if (temp !== "") {
                    regex = /^[A-Za-z\s]+$/;
                    if (temp.trim() === "") {
                        errors["title"] = "*Required field"
                    } else if (!regex.test(value)) {
                        errors["title"] = "Title can't have numbers or special characters";
                    } else if (temp.length < 3) {
                        errors["title"] = "Title should have min 3 characters"
                    } else if (temp.length > 50) {
                        errors["title"] = "Title should only have max 50 characters"
                    }
                }
                break;
        }
    });
    return errors;
}