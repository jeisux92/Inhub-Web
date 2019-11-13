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

const authSuccess = token => ({ type: AUTH_SUCCESS, token: token });

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: AUTH_LOGOUT
    }
}


export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        const user = {
            email: email,
            password: password
        };
        const url = "http://localhost:58205/api/Auth";
        axios.post(url, user).then(response => {
            const seconds = new Date(response.data.expires_in) - new Date().getTime();
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("expirationDate", response.data.expires_in);
            dispatch(checkAuthTimeOut(seconds));
            dispatch(authSuccess(response.data.access_token));
        }).catch(error => dispatch(authFail(error)));
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
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(
                    checkAuthTimeOut(
                        expirationDate.getTime() - new Date().getTime()
                    )
                );
            }
        }
    };
};