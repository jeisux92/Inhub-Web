import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from "store/actions/actionTypes";


const initialState = {
    loading: false,
    token: null,
    error: null,
    authRedirectionPath: "/"
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return { ...state, loading: true };
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                loading: false
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                authRedirectionPath: "/"
            };
        default:
            return state;
    }
}

export default reducer;