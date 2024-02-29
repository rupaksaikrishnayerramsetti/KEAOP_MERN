import { keyframes } from "@mui/material";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export const styles = {
  heading: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    // animation: `${bounce} 2s ease infinite`,
    textShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  },
};
