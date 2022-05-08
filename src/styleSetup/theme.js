import { createTheme } from "@mui/material/styles";

export const theme = createTheme();
theme.typography.h3 = {
  fontSize: "1.2rem",
  fontFamily: ['"Segoe UI"', "Roboto", "Ubuntu", "sans-serif"],
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

theme.typography.h5 = {
  fontSize: "0.7rem",
  fontFamily: ['"Open Sans"', "sans-serif"],
  "@media (min-width:600px)": {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

theme.typography.body2 = {
  fontSize: "0.6rem",
  fontFamily: ['"Open Sans"', "sans-serif"],
  "@media (min-width:600px)": {
    fontSize: "1.0rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.3rem",
  },
};
