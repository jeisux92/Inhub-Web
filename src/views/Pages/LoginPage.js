import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import { connect } from "react-redux";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
//Router

import { Redirect } from "react-router-dom";
import { auth, authCheckState } from "../../store/actions/auth"

const useStyles = makeStyles(styles);

// actions
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

const LoginPage = (props) => {
  useEffect(() => {

    props.onCheckAuth();

    return () => { }
  }, [])

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
      isTouched: false,
      isFocused: false
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
      isTouched: false,
      isFocused: false
    }
  });

  const [formValid, setFormValid] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const inputFocused = (controlName, state, e) => {
    const updatedControls = updateObject(form, {
      [controlName]: updateObject(form[controlName], {
        isFocused: state
      })
    });

    setForm(updatedControls);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      props.history.replace("/admin")
    }, 1000);

    //props.onAuth(form.user.inputProps.value, form.password.inputProps.value);
  }

  if (props.isAuthenticated) {
    return <Redirect to="/admin" />
  }

  let loading = null;

  if (isSubmitting) {
    loading = (<Modal>
      <Loading />
    </Modal>);
  }
  return (
    <div className={classes.container}>
      {loading}
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={submitHandler}>
            <Card login >
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>Inalambria Platform</h4>
              </CardHeader>
              <CardBody>
                {Object.keys(form).map(control => {
                  const inputProps = {
                    ...form[control].inputProps,
                    onChange: inputChanged.bind(this, control),
                    onFocus: inputFocused.bind(this, control, true),
                    onBlur: inputFocused.bind(this, control, false),
                  }
                  return (
                    <div key={control}>
                      <CustomInput
                        success={form[control].isValid}
                        error={!form[control].isValid && form[control].isTouched}
                        labelText={form[control].labelText}
                        formControlProps={form[control].formControlProps}
                        inputProps={inputProps}
                        focus={form[control].isFocused}
                      />
                    </div>
                  )
                })}
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" color="primary" size="lg" block disabled={!formValid} >
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token != null
})

const mapDispatchToProps = dispatch => ({
  onAuth: (user, password) => dispatch(auth(user, password)),
  onCheckAuth: () => dispatch(authCheckState())
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);