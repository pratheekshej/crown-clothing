import React from 'react';
import './collection-item.styles.scss';

const CollectionItem = ({id, price, name, imageUrl}) => {
    return (
        <div className="collection-item">
            <div className="image" style={{ background: `url(${imageUrl})` }}></div>
            <div className="collection-footer">
                <div className="name">{name}</div>
                <div className="price">{price}</div>
            </div>
        </div>
    );
}

export default CollectionItem;