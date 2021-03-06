import React, { useEffect } from 'react';
import './shop.styles.scss';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionStart } from '../../redux/shop/shop.action';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

const ShopPage = ({ fetchCollectionsBegin, match: { path } }) => {
    useEffect(() => {
        fetchCollectionsBegin();
    }, [fetchCollectionsBegin]);

    /* const fetchData = () => {
        fetch('https://firestore.googleapis.com/v1/projects/crown-db-7f54e/databases/(default)/documents/collections')
            .then(response => response.json())
            .then(collections => console.log('COLLECTIONS : ', collections));
    } */

    return (
        <div className="shop-page">
            <Switch>
                <Route
                    exact
                    path={`${path}`}
                    component={CollectionsOverviewContainer} />
                <Route
                    path={`${path}/:collectionId`}
                    component={CollectionPageContainer} />
            </Switch>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsBegin: () => dispatch(fetchCollectionStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);