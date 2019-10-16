import React from "react";
import Particles from "react-particles-js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Footer from "components/Footer/Footer.js";


import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";
import LoginPage from "views/Pages/LoginPage";

const useStyles = makeStyles(styles);

const particlesOptions = {

  "particles": {
    "number": {
      "value": 50
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

export default function Pages(props) {
  // styles
  const classes = useStyles();

  return (
    <div>
      <Particles className={classes.particles} params={particlesOptions} />
      <div className={classes.wrapper}>
        <div className={classes.fullPage}>
          <LoginPage {...props} />
          <Footer white />
        </div>
      </div>
    </div>
  );
}
