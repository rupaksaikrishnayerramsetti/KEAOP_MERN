type FormData = {
    title: string;
    date: string;
    time: string;
}

type ValidateNotePropstype = {
    formData: FormData;
}

type NoteErrorPropstype = {
    title?: string;
    date?: string;
    time?: string;
}

export const validateAlertData = ({ formData }: ValidateNotePropstype) => {
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
            case "date":
                let d1 = new Date();
                let d2 = new Date(value);
                d2.setHours(23, 59, 59, 999);
                if (d2 < d1) {
                    errors["date"] =
                        "Date should be less than or equal to today's date";
                }
                break;
            case "time":
                const providedDate: Date = new Date(formData.date);
                const providedTimeParts: string[] = formData.time.split(':');
                const providedTime: Date = new Date(providedDate);
                providedTime.setHours(parseInt(providedTimeParts[0], 10));
                providedTime.setMinutes(parseInt(providedTimeParts[1], 10));
                const currentDate: Date = new Date();
                if (providedDate.toDateString() === currentDate.toDateString()) {
                    if (providedTime <= currentDate) {
                        errors["time"] = "Time should be greater than the current time for today's date.";
                    }
                }
                break;
        }
    });
    return errors;
}