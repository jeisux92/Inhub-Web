import {
    AUTH_START,
    AUTH_FAIL,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT
} from "./actionTypes";
import axios from "axios";

const authStart = () => ({ type: AUTH_START });

const authFail = error => ({ type: AUTH_FAIL, error: error });

const authSuccess = (token, userId) => ({ type: AUTH_SUCCESS, token: token, userId: userId });

export const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    return {
        type: AUTH_LOGOUT
    }
}


export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password) => {
    debugger
    return dispatch => {
        dispatch(authStart());
        dispatch(authSuccess("xa", "ds"))
        localStorage.setItem("token", "xa");
        // const user = {
        //     email: email,
        //     password: password
        // };
        // const url = "inalambria/url";
        // axios.post(url, user).then(response => {
        //     localStorage.setItem("userId", response.userId);
        //     localStorage.setItem("token", response.token);
        //     localStorage.setItem("expirationTime", response.expirationTime);
        //     dispatch(checkAuthTimeOut(response.data.expiresIn));
        //     dispatch(authSuccess(response.userId, response.userId))
        // }).catch(error => dispatch(authFail(error)));
    }
}

export const setAuthRedirectPath = path => ({
    type: SET_AUTH_REDIRECT,
    path: path
});


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            dispatch(authSuccess("xa", "ds"))
            // const expirationDate = new Date(localStorage.getItem("expirationDate"));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // } else {
            //     const userId = localStorage.getItem("userId");
            //     dispatch(authSuccess(token, userId));
            //     dispatch(
            //         checkAuthTimeOut(
            //             (expirationDate.getTime() - new Date().getTime()) / 1000
            //         )
            //     );
            // }
        }
    };
};