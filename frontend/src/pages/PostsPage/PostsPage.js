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

    const {posts, serverErrors, status, page, perPage, itemCount} = useSelector(state => state.postReducer);

    useEffect(() => {
        dispatch(getAllPosts({page, perPage: searchData === '' ? 5 : 3, title: searchData}));
    }, [page, perPage, searchData]);

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
                            <input className={css.search_input}
                                   {...register('title')}
                                   type="text"
                                   placeholder={'Search...'}
                            />
                            <input className={css.confirm_input} type="submit"
                                   value={posts.length === 0 ? 'Get posts' : 'Search'}/>
                        </form>
                        {
                            posts.length
                                ?
                                <>
                                    <div className={css.sort_button_container}>
                                        <button className={css.sort_button} onClick={() => sortByPopular()}>Popular
                                        </button>
                                        <button className={css.sort_button} onClick={() => lastPosts()}>Last posts
                                        </button>
                                        <button className={css.sort_button} onClick={() => sortByComments()}>
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
                                                containerClassName={css.pagination_container}
                                                disabledClassName={css.pagination_disabled}
                                                activeClassName={css.pagination_active}
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
