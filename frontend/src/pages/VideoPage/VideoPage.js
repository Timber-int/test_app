import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPostVideos} from "../../store";
import {baseURL} from "../../config";
import {Player} from "video-react";
import css from './VideoPage.module.css';
import {CONSTANTS} from "../../constants";
import {Loading} from "../../components";

const VideoPage = () => {

    const dispatch = useDispatch();

    const {videos, status} = useSelector(state => state.postReducer);

    useEffect(() => {
        dispatch(getAllPostVideos());
    }, [])

    return (
        <div className={css.video_container}>
            {
                status === CONSTANTS.LOADING
                    ?
                    <Loading/>
                    :
                    videos.length
                        ?
                        videos.map(videoElem => (
                            <div className={css.video_element} key={videoElem.id}>
                                <Player>
                                    <source src={baseURL + '/' + videoElem.video} />
                                </Player>
                            </div>
                        ))
                        :
                        <div className={css.video_container_empty}>
                            Videos empty
                        </div>
            }
        </div>
    );
};

export {VideoPage};
