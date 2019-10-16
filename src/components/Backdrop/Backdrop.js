import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/backdropStyle.js";
const useStyles = makeStyles(styles);

const Backdrop = (props) => {
    const classes = useStyles();
    return (<div className={classes.backdrop}></div>)
}

export default Backdrop;