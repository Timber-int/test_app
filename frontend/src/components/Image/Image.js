import React from 'react';

import {NavLink} from 'react-router-dom';
import {baseURL} from "../../config";
import css from './Image.module.css';

const Image = ({
                   slide,
                   stopSlide,
                   startSlide,
               }) => {

    const {
        id,
        photo,
    } = slide;

    return (
        <div className={css.carousel_item} onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <NavLink to={'/posts/' + id} state={slide}>
                <img className={css.carousel_item_image} src={baseURL + '/' + photo} alt={'image'}/>
            </NavLink>
        </div>
    );
};

export {Image};
