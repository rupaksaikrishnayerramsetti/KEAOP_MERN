import { globalColors } from "../../styles/Colors";

export const editbuttonstyles = {
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#9E9E9E",
  },
};

export const deletebuttonstyles = {
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#ED6C02",
  },
};

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  width: "50vw",
  overflowWrap: "break-word",
  // border: "2px solid #000"
  boxShadow: 24,
  borderRadius:"1rem",
  padding: "3rem",
  background: globalColors.modelcolor,
};

export const noteelementstyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const notegridstyling = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem",
  marginLeft: "0.8rem",
};

export const notebuttonstyle = {
  display: "flex",
  alignItems: "center",
};

export const readmorelink = {
  color: "blue",
};

export const closeiconstyle = {
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  fontSize: "32px",
  padding: "8px",
};

export const paperStyles = {
  height: "80%",
  padding: "2rem",
  borderRadius: "1rem",
  wordBreak: "break-word",
  transition: "transform 0.2s",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  backgroundColor: "white",
  // border: "2px solid black",
};
export const notesCardStyle = {
  height: { lg: "18vh", md: "20vh", xs: "25vh", xl: "15vh" },
  padding: "2rem",
  borderRadius: "1rem",
  wordBreak: "break-word",
  transition: "transform 0.2s",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",

  // border: "2px solid black",
};
export const gridStyles = {
  transition: "transform 0.2s",
  //height: "76.6vh",
};
