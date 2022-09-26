import React from 'react';

import css from './Product.module.css';
import {NavLink} from "react-router-dom";

const Product = ({product}) => {
    const {width, weight, name, imageUrl, height, id, count} = product;
    return (
        <NavLink to={'/products/' + id} className={css.product_box} state={product}>
            <div>
                <img className={css.product_image} src={imageUrl} alt='productPhoto'/>
            </div>
            <div>Name: {name}</div>
            <div>Height: {height}</div>
            <div>Count: {count}</div>
        </NavLink>
    );
};

export {Product};
