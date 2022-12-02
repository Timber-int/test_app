import React, {useEffect} from 'react';

import {useLocation} from "react-router-dom";
import {Loading, Post} from "../../components";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useDispatch, useSelector} from "react-redux";
import {commentBodyValidateForCreate} from "../../validator";
import css from './PostPageDetails.module.css';
import {changePostViewsById, createComment, deleteCommentById} from "../../store";
import {CONSTANTS} from "../../constants";
import {AiTwotoneDelete} from "react-icons/ai";

const PostPageDetails = () => {

    const {state: post} = useLocation();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(commentBodyValidateForCreate),
        mode: 'onTouched',
    });

    const dispatch = useDispatch();

    const {user} = useSelector(state => state.authReducer);

    const {theme} = useSelector(state => state.postReducer);

    const {comments, serverErrors, status} = useSelector(state => state.commentReducer);

    const submit = (data) => {
        dispatch(createComment({commentData: {...data, userId: user.id, postId: post.id}}));
        reset();
    }

    useEffect(() => {
        dispatch(changePostViewsById({id: post.id}))
    }, []);

    useEffect(() => {
    }, [theme]);

    return (
        <div className={css.container}>
            <div className={css.post_details_container}>
                <Post post={post} textLength={post.text.length} textHigh={true} isUserPost={false}/>
            </div>
            <div className={css.comments_container}>
                <form onSubmit={handleSubmit(submit)} className={css.comment_form}>
                    <div className={css.errors_span}>
                        {
                            errors.text
                            &&
                            <span>
                            {
                                errors.text.message
                            }
                            </span>
                        }
                    </div>
                    <input className={css.registration_input}
                           type="text" {...register('text')} required
                           placeholder={'comment'}
                    />
                    <input
                        className={status === CONSTANTS.LOADING ? theme === true ? css.confirm_input_disabled_dark : css.confirm_input_disabled : theme === true ? css.confirm_input_dark : css.confirm_input}
                        type="submit" value={'Send'}/>
                </form>
                {status === CONSTANTS.LOADING ? <div className={css.comments_loading}><Loading/></div> :
                    <div className={css.comments_block}>
                        {
                            comments
                                .filter(comment => comment.postId === post.id)
                                .map(comment => (
                                    <div key={comment.id} className={css.single_comment}>
                                    <span className={theme === true ? css.comment_author_dark : css.comment_author}>
                                        {comment.authorLastName[0].toUpperCase()}{comment.authorFirstName[0].toUpperCase()}
                                    </span>
                                        <span className={theme === true ? css.comment_text_dark : css.comment_text}>
                                        {comment.text}
                                    </span>
                                        {
                                            user && user.id === comment.userId
                                                ?
                                                <span className={css.delete_comment_button}
                                                      onClick={() => dispatch(deleteCommentById({id: comment.id}))}><AiTwotoneDelete/>
                                                </span>
                                                :
                                                <span></span>
                                        }
                                    </div>
                                ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export {PostPageDetails};
