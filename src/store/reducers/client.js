import {
    START_CREATE_CLIENT,
    SUCCESS_CREATE_CLIENT,
    FAIL_CREATE_CLIENT
} from "../actions/actionTypes";


const initialState = {

};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CREATE_CLIENT:
            return state;
            break;
        case SUCCESS_CREATE_CLIENT:
            return state;
            break;
        case FAIL_CREATE_CLIENT:
            return state;
            break;
        default:
            return state;
    }
}

export default reducer;