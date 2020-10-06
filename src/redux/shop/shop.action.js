import { shopActionType } from "./shop.types";

export const updateShopData = (collectionsMap) => ({
    type: shopActionType.UPDATE_SHOP_DATA,
    payload: collectionsMap
});