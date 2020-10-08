import { userActionTypes } from "./user.types";

export const setCurrentUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const signingInOrOut = () => ({
    type: userActionTypes.SET_SIGNING_IN_OUT
});