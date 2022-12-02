import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Loading, Post} from "../../components";
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom";
import {getAllPosts, postActions} from "../../store";
import {CONSTANTS} from "../../constants";
import ReactPaginate from "react-paginate";
import css from './PostsPage.module.css';

const PostsPage = () => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const [searchData, setSearchData] = useState('');

    const {posts, serverErrors, status, page, perPage, itemCount, theme} = useSelector(state => state.postReducer);

    useEffect(() => {
        dispatch(getAllPosts({
            page: searchData.length > 0 ? 1 : page,
            perPage: searchData === '' ? 5 : 3,
            title: searchData
        }));
    }, [page, perPage, searchData]);

    useEffect(() => {
    }, [theme]);

    const sortByPopular = () => {
        dispatch(getAllPosts({page, perPage: searchData === '' ? 5 : 3, title: searchData, viewsSort: true}));
    }

    const sortByComments = () => {
        dispatch(postActions.sortPostsByComments());
    }

    const lastPosts = () => {
        dispatch(getAllPosts({page, perPage: searchData === '' ? 5 : 3, title: searchData, viewsSort: false}));
    }

    const submit = (data) => {
        setSearchData(data.title);
        reset();
    }

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
                        <form onSubmit={handleSubmit(submit)} className={css.search_post_container}>
                            <input className={theme === true ? css.search_input_dark : css.search_input}
                                   {...register('title')}
                                   type="text"
                                   placeholder={'Search...'}
                            />
                            <input className={theme === true ? css.confirm_input_dark : css.confirm_input} type="submit"
                                   value={posts.length === 0 ? 'Get posts' : 'Search'}/>
                        </form>
                        {
                            posts.length
                                ?
                                <>
                                    <div className={css.sort_button_container}>
                                        <button className={theme === true ? css.sort_button_dark : css.sort_button}
                                                onClick={() => sortByPopular()}>Popular
                                        </button>
                                        <button className={theme === true ? css.sort_button_dark : css.sort_button}
                                                onClick={() => lastPosts()}>Last posts
                                        </button>
                                        <button className={theme === true ? css.sort_button_dark : css.sort_button}
                                                onClick={() => sortByComments()}>
                                            Best comments
                                        </button>
                                    </div>
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
                                        <div
                                            className={theme === true ? css.popular_text_dark : css.popular_text}>Popular
                                            posts:
                                        </div>
                                        <div className={css.posts_title_container}>
                                            {
                                                posts.map(post =>
                                                    (
                                                        <NavLink to={'/posts/' + post.id}
                                                                 state={post}
                                                                 key={post.id}
                                                                 className={theme === true ? css.popular_post_dark : css.popular_post}
                                                        >
                                                            {post.title}
                                                        </NavLink>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                    {
                                        itemCount <= 3
                                            ?
                                            <></>
                                            :
                                            <ReactPaginate
                                                breakLabel='...'
                                                pageCount={Math.ceil(itemCount / perPage)}
                                                onPageChange={(data) => dispatch(postActions.setPage({pageNumber: data.selected + 1}))}
                                                forcePage={page === 1 ? 0 : page - 1}
                                                containerClassName={theme === true ? css.pagination_container_dark : css.pagination_container}
                                                disabledClassName={theme === true ? css.pagination_disabled_dark : css.pagination_disabled}
                                                activeClassName={theme === true ? css.pagination_active_dark : css.pagination_active}
                                            />
                                    }
                                </>
                                :
                                <div className={css.empty_posts_container}>There are no posts.</div>
                        }
                    </div>
            }
        </>
    );
};

export {PostsPage};
