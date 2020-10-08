import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isSigningInOrOut: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case userActionTypes.SET_SIGNING_IN_OUT:
            return {
                ...state,
                isSigningInOrOut: !state.isSigningInOrOut
            };
        default:
            return state;
    }
};

export default userReducer;