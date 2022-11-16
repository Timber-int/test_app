import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../../store";
import css from './PostsPage.module.css';
import {CONSTANTS} from "../../constants";
import {Loading, Post} from "../../components";
import {NavLink} from "react-router-dom";

const PostsPage = () => {

    const dispatch = useDispatch();

    const {posts, serverErrors, status} = useSelector(state => state.postReducer);

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
                        <div className={css.posts_block}>
                            {
                                posts.map(post => (
                                            <Post
                                                key={post.id}
                                                post={post}
                                                margin={true}
                                                textHigh={false}
                                                textLength={400}
                                                isUserPost={false}
                                            />
                                    )
                                )
                            }
                        </div>
                        <div className={css.popular_posts_block}>
                            <div className={css.popular_text}>Popular posts:</div>
                            {
                                posts.map(post =>
                                    (
                                        <NavLink to={'/posts/' + post.id}
                                                 state={post}
                                                 key={post.id}
                                                 className={css.popular_post}>{post.title}
                                        </NavLink>
                                    ))
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export {PostsPage};
