import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from "store/actions/actionTypes";


const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirectionPath: "/"
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return state;
        case AUTH_SUCCESS:
            return state;
        case AUTH_FAIL:
            return state;
        case AUTH_LOGOUT:
            return state;
        default:
            return state;
    }
}

export default reducer;