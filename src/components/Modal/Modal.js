import React from "react";
import Backdrop from "components/Backdrop/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/modalStyle.js";
import Particles from "react-particles-js";

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

const Modal = (props) => {    
    const classes = useStyles();
    const page = props.fullWindow ? <Particles className={classes.particles} params={particlesOptions} /> : <Backdrop></Backdrop>;
    return (
        <>
            {page}
            <div className={classes.modal} >
                {props.children}
            </div>
        </>
    )
}

export default Modal;
