export const globalColors = {
    textcolor: "#0E21A0",
    normaltext: "#808080",
    backgroundcolor: "#D0BFFF",
    navbarcolor: "#4D2DB7",
    modelcolor: "#F0F8FF",
}

export const globalbuttonstyle = {
  backgroundColor: globalColors.navbarcolor,
  "&:hover": {
    backgroundColor: "white",
    color: globalColors.navbarcolor,
    borderColor: globalColors.navbarcolor,
  },
  border: `2px solid ${globalColors.navbarcolor}`,
}