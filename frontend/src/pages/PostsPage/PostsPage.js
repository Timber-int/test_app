import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Loading, Post} from "../../components";
import {NavLink} from "react-router-dom";
import {getAllPosts, postActions} from "../../store";
import {CONSTANTS} from "../../constants";
import css from './PostsPage.module.css';
import ReactPaginate from "react-paginate";

const PostsPage = () => {

    const dispatch = useDispatch();

    const {posts, serverErrors, status, page, perPage, itemCount} = useSelector(state => state.postReducer);

    useEffect(() => {
        dispatch(getAllPosts({page, perPage: 3}));
    }, [page, perPage]);

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
                    posts.length
                        ?
                        <div className={css.posts_container}>
                            <div className={css.posts_block}>
                                {
                                    posts.map(post => (
                                            <Post
                                                key={post.id}
                                                post={post}
                                                margin={true}
                                                textHigh={false}
                                                isUserPost={false}
                                                textLength={400}
                                            />
                                        )
                                    )
                                }
                            </div>
                            <div className={css.popular_posts_block}>
                                <div className={css.popular_text}>Popular posts:</div>
                                <div className={css.posts_title_container}>
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
                                <ReactPaginate
                                    breakLabel='...'
                                    pageCount={Math.ceil(itemCount / perPage)}
                                    onPageChange={(data) => dispatch(postActions.setPage({pageNumber: data.selected + 1}))}
                                    forcePage={page === 1 ? 0 : page - 1}
                                    containerClassName={css.pagination_container}
                                    disabledClassName={css.pagination_disabled}
                                    activeClassName={css.pagination_active}
                                />
                        </div>
                        :
                        <div className={css.empty_posts_container}>There are no posts.</div>
            }
        </>
    );
};

export {PostsPage};
