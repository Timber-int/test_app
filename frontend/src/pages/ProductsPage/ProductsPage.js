import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Product, SmallModalWindow} from "../../components";
import {getAllProducts, productActions} from "../../store";

import css from './ProductsPage.module.css';

const ProductsPage = () => {

    let dispatch = useDispatch();

    const {products, showSmallWindow} = useSelector(state => state['productReducer']);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    return (
        <div>
            <div className={css.add_product_button_container}>
                <button className={css.add_product_button} onClick={() => dispatch(productActions.showWindow())}>Add
                    product
                </button>
            </div>
            <div>
                {
                    showSmallWindow === true
                        ?
                        <SmallModalWindow/>
                        :
                        <></>
                }
            </div>

            <div className={css.products_container}>
                {
                    [...products].sort((a, b) => a.count - b.count).sort((a, b) => a.name.localeCompare(b.name)).map(product =>
                        <Product key={product.id} product={product}/>)
                }
            </div>
        </div>
    );
};

export {ProductsPage};
