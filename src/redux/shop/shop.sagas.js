import { takeLatest, call, put, all } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { fetchCollectionFailure, fetchCollectionSuccess } from './shop.action';
import shopActionType from "./shop.types";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(shopActionType.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}