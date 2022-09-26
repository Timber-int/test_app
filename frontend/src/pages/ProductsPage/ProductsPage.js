import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {ModalWindow, Product} from "../../components";
import {getAllProducts, productActions} from "../../store";

import css from './ProductsPage.module.css';

const ProductsPage = () => {

    let dispatch = useDispatch();

    const {products, showWindow} = useSelector(state => state['productReducer']);

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    return (
        <div>
            <div className={css.add_product_button_container}>
                <button onClick={() => dispatch(productActions.showWindow())}>Add product</button>
            </div>
            <div>
                {
                    showWindow === true
                        ?
                        <ModalWindow/>
                        :
                        <></>
                }
            </div>
            <div className={css.products_container}>
                {
                    [...products].sort((a,b)=>a.count- b.count).sort((a, b) => a.name.localeCompare(b.name)).map(product =>
                        <Product key={product.id} product={product}/>)
                }
            </div>
        </div>
    );
};

export {ProductsPage};
