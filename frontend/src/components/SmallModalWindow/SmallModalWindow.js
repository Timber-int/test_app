import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {deleteProductById, productActions} from "../../store";
import css from './SmallModalWindow.module.css'

const SmallModalWindow = () => {

    const dispatch = useDispatch();

    const {productIdToDelete} = useSelector(state => state['productReducer']);

    const [visible, setVisible] = useState(true);

    const rootClasses = [css.modalWindow];

    if (visible) {
        rootClasses.push(css.active);
    }

    const exit = () => {
        setVisible(false);
        dispatch(productActions.showSmallWindowDeleteChoose({id: productIdToDelete}));
    };

    const removeProduct = (id) => {
        dispatch(deleteProductById({id}));
        setVisible(false);
        dispatch(productActions.showSmallWindowDeleteChoose({id: productIdToDelete}));
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={css.modalWindowContent} onClick={event => event.stopPropagation()}>
                <button className={css.event_button_confirm} onClick={()=>removeProduct(productIdToDelete)}>Сonfirm</button>
                <button className={css.event_button_cancel} onClick={() => exit()}>Сancel</button>
            </div>
        </div>
    );
};

export {SmallModalWindow};
