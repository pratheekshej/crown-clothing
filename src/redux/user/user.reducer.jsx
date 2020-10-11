import userActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isSigningInOrOut: false,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        // case userActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        case userActionTypes.SIGN_IN_SUCCESS: // EMAIL_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isSigningInOrOut: false // !state.isSigningInOrOut
            };
        // case userActionTypes.GOOGLE_SIGN_IN_FAILURE:
        case userActionTypes.SIGN_IN_FAILURE: // EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload,
                isSigningInOrOut: false // !state.isSigningInOrOut
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