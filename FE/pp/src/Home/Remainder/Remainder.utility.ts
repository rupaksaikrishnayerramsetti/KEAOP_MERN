import { Box } from "@mui/system";
import { globalbuttonstyle } from "../../styles/Colors";

export type alertformtype = {
    title: string;
    date: string;
    time: string;
};
  
export type Remainderprops = {
  alertCount: number;
  setalertCount: (value: number) => void;
};

export type alerttype = {
    alert_id: number;
    title: string;
    date: string;
    time: string;
  };

export type FormErrortype = {
  title?: string | undefined;
  date?: string | undefined;
  time?: string | undefined;
};
  
export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const reset = {
    title: "",
    date: "",
    time: "",
};
  
export function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

export function formatTime(timeString: string) {
    const [hours, minutes] = timeString.split(":");
    let formattedTime = "";

    const hoursInt = parseInt(hours);
    if (!isNaN(hoursInt) && hoursInt >= 0 && hoursInt <= 23) {
      const period = hoursInt >= 12 ? "PM" : "AM";
      const formattedHours =
        hoursInt !== 12
          ? (hoursInt % 12).toString().padStart(2, "0")
          : hoursInt.toString();
      const formattedMinutes = minutes.padStart(2, "0");

      formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
    }

    return formattedTime;
}

export function active(upComing:boolean) {
  return {
    bgcolor: !upComing ? "transparent" : "success.main",
    color: !upComing ? "success.main" : "white",
    marginRight: "1rem",
    "&:hover": {
      bgcolor: !upComing ? "transparent" : "success.dark",
    },
  };
}

export function InactiveStyle(upComing:boolean) {
  return {
    marginRight: "1rem",
    bgcolor: upComing ? "transparent" : "warning.main",
    color: upComing ? "warning.main" : "white",
    "&:hover": {
      bgcolor: upComing ? "transparent" : "warning.dark",
    },
  };
}

export const textFieldStyle = {
  width: '100%',
};

export function showsearchedalerts(alerts: alerttype[], alert_title: string) {
  return alerts.filter((alert) =>
    alert.title.toLowerCase().includes(alert_title.toLowerCase())
  );
}
  
export function upcomingAlerts(data: alerttype[]) {
  let today= new Date();
  let today_str = today.toISOString().split('T')[0];
  return data.filter((d) => d.date >= today_str);
}

export function completedAlerts(data: alerttype[]) {
  let today= new Date();
  let today_str = today.toISOString().split('T')[0];
  return data.filter((d) => d.date < today_str);
}

export const today = new Date().toISOString().split('T')[0];

export const getCurrentTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Format the current time as 'HH:mm'
    const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
    return currentTime;
};
  
export const todaytime = new Date().toISOString().split('T')[0];