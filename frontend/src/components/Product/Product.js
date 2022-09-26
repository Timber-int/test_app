import React from 'react';

import {NavLink} from "react-router-dom";
import css from './Product.module.css';
import {useDispatch} from "react-redux";
import {deleteProductById, productActions} from "../../store";

const Product = ({product}) => {
    const {name, imageUrl, height, id, count} = product;

    const dispatch = useDispatch();

    const removeProduct = (id) => {
        dispatch(deleteProductById({id}));
    }

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
                <button onClick={() => removeProduct(id)} className={css.delete_button}>Delete</button>
            </div>
            <div className={css.update_button_container}>
                <button className={css.update_button} onClick={() =>setProductToUpdate(product) }>Update product</button>
            </div>
        </div>

    );
};

export {Product};
