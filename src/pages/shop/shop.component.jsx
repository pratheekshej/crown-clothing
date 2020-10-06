import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route, Switch } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateShopData } from '../../redux/shop/shop.action';
import WidthSpinner from '../../components/width-spinner/width-spinner.component';

const CollectionOverviewWithSpinner = WidthSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WidthSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = { loading: true };
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.get().then(snapshot => { // async
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    fetchData = () => {
        fetch('https://firestore.googleapis.com/v1/projects/crown-db-7f54e/databases/(default)/documents/collections')
            .then(response => response.json())
            .then(collections => console.log('COLLECTIONS : ', collections));
    }

    render() {
        const { match: { path } } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Switch>
                    <Route
                        exact
                        path={`${path}`}
                        render={props => (
                            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
                        )} />
                    <Route
                        path={`${path}/:collectionId`}
                        render={props => (
                            <CollectionPageWithSpinner isLoading={loading} {...props} />
                        )} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateShopData(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);