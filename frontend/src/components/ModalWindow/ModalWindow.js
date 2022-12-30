import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ImExit} from 'react-icons/im';
import {Player} from 'video-react';
import {baseURL} from "../../config";

import 'video-react/dist/video-react.css';
import css from './ModalWindow.module.css';
import {dishesActions as postActions} from "../../store";

const ModalWindow = () => {

    const dispatch = useDispatch();

    const rootClasses = [css.modalWindow];

    const {visible, chosenDish} = useSelector(state => state['dishesReducer']);

    if (visible) {
        rootClasses.push(css.active);
    }

    const exit = () => {
        dispatch(postActions.setShowWindow({chosenDish: null}));
    };

    return (
        <div className={rootClasses.join(' ')}>
            <div className={css.modalWindowContent} onClick={event => event.stopPropagation()}>
                <div className={css.exit_box}><ImExit className={css.exit_item} onClick={() => exit()}/></div>
                <div className={css.dish_container}>
                    <div className={css.dish_name}>{chosenDish.name}</div>
                    <div className={!chosenDish.videos.length ? css.recipe_large : css.recipe}>{chosenDish.recipe}</div>
                    {
                        chosenDish.videos.length
                            ?
                            <div className={css.videos_container}>{chosenDish.videos.map(video => (
                                <div className={css.video_box} key={video.id}>
                                    <Player>
                                        <source src={baseURL + '/' + video.video}/>
                                    </Player>
                                </div>
                            ))}
                            </div>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    );
};

export {ModalWindow};
