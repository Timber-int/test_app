import React, {useState} from 'react';
import {useDispatch} from "react-redux";

import {CreateProductForm} from "../CreateProductForm/CreateProductForm";
import {productActions} from "../../store";
import css from './ModalWindow.module.css';

const ModalWindow = () => {

    let dispatch = useDispatch();

    const [visible, setVisible] = useState(true);

    const rootClasses = [css.modalWindow];

    if (visible) {
        rootClasses.push(css.active);
    }
    const exit = () => {
        setVisible(false);
        dispatch(productActions.showWindow())
    };

    return (
        <div className={rootClasses.join(' ')}>
            <div className={css.modalWindowContent} onClick={event => event.stopPropagation()}>
                {<div className={css.exit_box} onClick={() => exit()}><span>✖</span></div>}
                <div className={css.create_product_form_container}>
                    <CreateProductForm/>
                </div>
            </div>
        </div>
    );
};

export {ModalWindow};
