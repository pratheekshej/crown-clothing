import { createSelector } from 'reselect';

/* const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}; */

const selectShopData = (state) => state.shop;

export const selectShopCollections = createSelector(
    [selectShopData],
    (shop) => shop.collections
);

export const selectCollections = createSelector(
    [selectShopCollections],
    (collections) => Object.keys(collections).map(key => collections[key])
);

// collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
export const selectCollection = (collectionUrlParam) => createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
);