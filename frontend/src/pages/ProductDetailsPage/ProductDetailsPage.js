import React from 'react';
import {useLocation} from "react-router-dom";
import css from './ProductDetailsPage.module.css';

const ProductDetailsPage = () => {

    const {state: productDetails} = useLocation();
    const {width, weight, name, imageUrl, height, id, count} = productDetails;

    return (
        <div className={css.product_details_container}>
            <div className={css.first_block}>
                <img className={css.product_image} src={imageUrl} alt='productPhoto'/>
            </div>
            <div className={css.second_block}>
                <div>Name: <span className={css.product_element}> {name}</span></div>
                <div>
                    <ul>
                        <li>Width: <span className={css.product_element}>{width}</span></li>
                        <li>Height: <span className={css.product_element}>{height}</span></li>
                    </ul>
                </div>
                <div>Weight: <span className={css.product_element}>{weight}</span></div>
                <div>Count: <span className={css.product_element}>{count}</span></div>
            </div>
            <div className={css.content_container}>
                <div>
                    <button >Update product</button>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export {ProductDetailsPage};
