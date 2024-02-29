import { globalColors } from "../../styles/Colors";

export const spentgridstyling = {
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
  backgroundColor:"white",
  borderRadius: "1rem",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  p: 4,
  background: globalColors.modelcolor,
};

export const closeiconstyle = {
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  fontSize: "32px",
  padding: "8px",
};

export const maingridstyle = {
    padding: "1rem",
    marginTop: "1rem",
    width: "100%"
};

export const internalboxstyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
}

export const monthyeartypographystyle = {
    marginRight: "2rem",
    marginBottom: "1rem",
    color: "#007bff",
    fontWeight: "bold",
    borderBottom: "2px solid #007bff",
    display: "inline-block",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f8f8",
}

export const totalsalarytypographystyle = {
    fontWeight: "bolder",
    borderBottom: "2px solid #007bff",
    margin:"1rem",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f8f8",
}