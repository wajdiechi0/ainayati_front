import {
  defaultFont,
  dangerColor,
  whiteColor
} from "./../../material-dashboard-react.js";

import dropdownStyle from "./../dropdownStyle.js";

const headerLinksStyle = theme => ({
  ...dropdownStyle(theme),
  linkText: {
    zIndex: "4",
    ...defaultFont,
    fontSize: "14px",
    margin: "0px"
  },
  margin: {
    zIndex: "4",
    margin: "0"
  },
  searchIcon: {
    width: "17px",
    zIndex: "4"
  },
  notifications: {
    zIndex: "4",

    position: "absolute",
    top: "2px",
    border: "1px solid " + whiteColor,
    right: "4px",
    fontSize: "9px",
    background: dangerColor[0],
    color: whiteColor,
    minWidth: "16px",
    height: "16px",
    borderRadius: "10px",
    textAlign: "center",
    lineHeight: "16px",
    verticalAlign: "middle",
    display: "block"
  },
  manager: {
    display: "inline-block"
  }
});

export default headerLinksStyle;
