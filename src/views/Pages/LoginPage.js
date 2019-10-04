import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);


// Input utilities
//import {  updateObject } from "../../shared/utility";


export const validateForm = (value, rules) => {
  let isValid = true;

  if (rules.maxLenght <= value.length) {
    isValid = false;
  }

  if (rules.minLenght >= value.length) {
    isValid = false;
  }


  return isValid;
}
export const updateObject = (oldObject, updateProperties) => ({
  ...oldObject,
  ...updateProperties
})

const LoginPage = () => {

  // Animation
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [form, setForm] = useState({
    user: {
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        value: "",
        endAdornment: (
          <InputAdornment position="end">
            <Email className={classes.inputAdornmentIcon} />
          </InputAdornment>
        )
      },
      labelText: "Email...",
      rules: {
        maxLenght: 15,
        minLenght: 10
      },
      isValid: false,
      isTouched: false
    },
    password: {
      labelText: "Password",
      formControlProps: {
        fullWidth: true
      },
      inputProps: {
        value: "",
        endAdornment: (
          <InputAdornment position="end">
            <Icon className={classes.inputAdornmentIcon}>
              lock_outline
                        </Icon>
          </InputAdornment>
        ),
        type: "password",
        autoComplete: "off",
      },
      rules: {
        maxLenght: 10
      },
      isValid: false,
      isTouched: false
    }
  });
  const [formValid, setFormValid] = useState(false);


  const inputChanged = (controlName, e) => {
    const updatedControls = updateObject(form, {
      [controlName]: updateObject(form[controlName], {
        inputProps: updateObject(form[controlName].inputProps,
          {
            value: e.target.value
          }),
        isValid: validateForm(e.target.value, form[controlName].rules),
        isTouched: true
      })
    });
    let formIsValid = true;
    for (const control in updatedControls) {
      formIsValid = formIsValid && updatedControls[control].isValid;
    }

    setForm(updatedControls);
    setFormValid(formIsValid);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    alert("I'm Submit");
  }
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={submitHandler}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardBody>

                {Object.keys(form).map(control => {
                  const inputProps = { ...form[control].inputProps, onChange: inputChanged.bind(this, control) }
                  return (
                    <div key={control}>
                      <CustomInput
                        labelText={form[control].labelText}
                        formControlProps={form[control].formControlProps}
                        inputProps={inputProps}
                      />
                    </div>
                  )
                })}
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" color="primary" simple size="lg" block disabled={!formValid} >
                  Iniciar sesión
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}




export default LoginPage;