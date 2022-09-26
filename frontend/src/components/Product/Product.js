import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

import {productActions} from "../../store";
import css from './Product.module.css';

const Product = ({product}) => {
    const {name, imageUrl, height, id, count} = product;

    const dispatch = useDispatch();

    const setProductToUpdate = (productDataToUpdate) => {
        dispatch(productActions.showWindow());
        dispatch(productActions.setSingleProductToUpdate({productDataToUpdate}))
    }
    return (
        <div className={css.product_block}>
            <NavLink to={'/products/' + id} className={css.product_box} state={product}>
                <div>
                    <img className={css.product_image} src={imageUrl} alt='productPhoto'/>
                </div>
                <div>Name: {name}</div>
                <div>Height: {height}</div>
                <div>Count: {count}</div>
            </NavLink>
            <div>
                <button onClick={() => dispatch(productActions.showSmallWindowDeleteChoose({id}))} className={css.delete_button}>Delete</button>
            </div>
            <div className={css.update_button_container}>
                <button className={css.update_button} onClick={() =>setProductToUpdate(product) }>Update product</button>
            </div>
        </div>

    );
};

export {Product};
