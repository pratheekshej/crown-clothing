import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => {
    const { path } = match;
    return (
        <div className="shop-page">
            <Route exact path={`${path}`} component={CollectionsOverview} />
            <Route path={`${path}/:collectionId`} component={CollectionPage} />
        </div>
    );
};

export default ShopPage;