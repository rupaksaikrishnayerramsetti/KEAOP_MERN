import { globalColors } from "../../styles/Colors";

export const maincontainer = {
  display: "flex",
  paddingTop: "4rem",
  flexWrap: { xs: "wrap-reverse", lg: "nowrap" },
  backgroundColor:globalColors.backgroundcolor,
  height: { lg: "93.4vh" }
};

export const rightbox = {
  display: "flex",
  flexDirection: "column",
  width:"100%",
  flexGrow: 15,
  justifyContent: "space-between",
  padding: "2.5rem 0rem",
  overflowY: { lg: "scroll" },
  overflowX: { lg: "hidden" },
  scrollbarWidth: "thin",
  scrollbarColor: "#6590fc transparent",
  height: { lg: "80vh" },
};

export const dividerstyle = {
  marginLeft: "0.5rem",
  borderWidth: "0.1rem",
  borderStyle: "solid",
  borderColor: "black",
};

export const alertboxstyle = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
};
