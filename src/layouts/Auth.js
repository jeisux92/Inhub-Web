import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Footer from "components/Footer/Footer.js";


import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";
import LoginPage from "views/Pages/LoginPage";

const useStyles = makeStyles(styles);

export default function Pages() {
  // styles
  const classes = useStyles();

  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.fullPage}>
          <LoginPage />
          <Footer white />
        </div>
      </div>
    </div>
  );
}
