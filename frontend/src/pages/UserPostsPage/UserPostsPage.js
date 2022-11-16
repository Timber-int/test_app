import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {Loading, Post} from "../../components";
import {CONSTANTS} from "../../constants";
import css from './UserPostsPage.module.css';
import {getAllPosts} from "../../store";

const UserPostsPage = () => {

    const {posts, status, serverErrors} = useSelector(state => state.postReducer);
    const {user} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    return (
        <>
            {
                serverErrors && <div className={css.server_error}>{serverErrors}</div>
            }
            {
                status === CONSTANTS.LOADING
                    ?
                    <Loading/>
                    :
                    <div className={css.posts_container}>
                        {
                            [...posts].reverse().filter(post => post.userId === user.id).map(post => (
                                <Post
                                    key={post.id}
                                    post={post}
                                    margin={true}
                                    textHigh={false}
                                    textLength={400}
                                    isUserPost={true}
                                />
                            ))
                        }
                    </div>
            }
        </>
    );
};

export {UserPostsPage};
