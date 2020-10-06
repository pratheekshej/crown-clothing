import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { shopActionType } from "./shop.types";

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart());
        collectionRef.get().then(snapshot => { // async
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionFailure(error.message)));
    };
};

export const fetchCollectionStart = () => ({
    type: shopActionType.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = (collectionsMap) => ({
    type: shopActionType.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = (errorMessage) => ({
    type: shopActionType.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const updateShopData = (collectionsMap) => ({
    type: shopActionType.UPDATE_SHOP_DATA,
    payload: collectionsMap
});