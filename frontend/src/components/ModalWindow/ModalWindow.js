import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ImExit} from 'react-icons/im';

import css from './ModalWindow.module.css';
import {postActions} from "../../store";

const ModalWindow = () => {

    const dispatch = useDispatch();

    const {visible, text} = useSelector(state => state.postReducer);

    const rootClasses = [css.modalWindow];

    if (visible) {
        rootClasses.push(css.active);
    }
    const exit = () => {
        dispatch(postActions.setShowWindow({text: ''}));
    };

    return (
        <div className={rootClasses.join(' ')}>
            <div className={css.modalWindowContent} onClick={event => event.stopPropagation()}>
                <div className={css.exit_box}><ImExit className={css.exit_item} onClick={() => exit()}/></div>
                <div className={css.post_text}>
                    {text}
                </div>
            </div>
        </div>
    );
};

export {ModalWindow};
