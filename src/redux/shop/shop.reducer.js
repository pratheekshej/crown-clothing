// import SHOP_DATA from "./shop.data";
import { shopActionType } from "./shop.types";

const INITIAL_STATE = {
    collections: null, // SHOP_DATA
    isFetching: false,
    errorMessage: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case shopActionType.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            };
        case shopActionType.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            };
        case shopActionType.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        case shopActionType.UPDATE_SHOP_DATA:
            return {
                ...state,
                collections: action.payload
            };
        default:
            return state;
    }
}

export default shopReducer;
