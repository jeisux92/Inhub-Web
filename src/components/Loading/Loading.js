import classes from "./Loading.module.scss";
import React from "react";
import classNames from "classnames";


const Loading = (props) => {
    const loadingClasses = classNames(classes.LdsRoller, props.classes)
    return (

        <div className={loadingClasses}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default Loading;