import { globalColors } from "../../styles/Colors";

export const remaindergridstyling = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
    marginLeft: "0.8rem",
};
  
export const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    // border: "1px solid #ccc",
    borderRadius: "1.4rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    padding: "4rem 3rem",
    background: globalColors.modelcolor,
};
  
export const closeiconstyle = {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    fontSize: "1.5rem",
    padding: "1rem",
    margin:"2px"
  };

export const gridStyles = {
  transition: "transform 0.2s",
  //height: "74.6vh",
  };

export const alertelementstyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

export const alertbuttonstyle = {
    display: "flex",
    alignItems: "center",
  };

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