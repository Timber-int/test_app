import React, {useEffect} from 'react';
import {Loading} from "../../components";
import {useForm} from "react-hook-form";
import {FaFileUpload} from "react-icons/fa";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";
import {CONSTANTS} from "../../constants";
import {postBodyValidateForCreate} from "../../validator";
import {createPost, postActions, updatePostById} from "../../store";
import {useNavigate} from "react-router-dom";
import css from './CreatePostPage.module.css';

const CreatePostPage = () => {

    const navigate = useNavigate();

    const {status, postDataToUpdate, serverErrors, theme} = useSelector(state => state.postReducer);

    const {user} = useSelector(state => state.authReducer);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(postBodyValidateForCreate),
        mode: 'onTouched',
    });

    useEffect(() => {
        if (postDataToUpdate) {
            setValue("title", postDataToUpdate.title);
            setValue("text", postDataToUpdate.text);
            setValue("photo", postDataToUpdate.photo);
        }
    }, [postDataToUpdate]);

    useEffect(() => {
    }, [theme]);

    const dispatch = useDispatch();

    const submit = (data) => {
        if (user) {
            if (postDataToUpdate) {
                dispatch(updatePostById({
                    postId: postDataToUpdate.id,
                    postData: {...data, userId: user.id, uniqueTitle: postDataToUpdate.title}
                }));
                if (status === CONSTANTS.RESOLVED) {
                    reset();
                    navigate('/posts');
                }
            } else {
                dispatch(createPost({postData: {...data, userId: user.id}}));
                if (status === CONSTANTS.RESOLVED) {
                    reset();
                    navigate('/posts');
                }
            }
        }
    }

    const clearForm = () => {
        dispatch(postActions.clearPostDataToUpdate());
        reset();
    }

    return (
        <div>
            {
                serverErrors && <div className={css.server_error}>{serverErrors}</div>
            }
            {
                status === CONSTANTS.LOADING
                    ?
                    <Loading/>
                    :
                    <>
                        <form onSubmit={handleSubmit(submit)}>
                            <div className={css.errors_span}>{errors.photo && <span>{errors.photo.message}</span>}</div>
                            <div className={css.file_input_box}>
                                <input className={css.file_input}
                                       type="file"
                                       id="uploadBtn"
                                       {...register('photo')}
                                       placeholder={'photo...'}
                                />
                                <label className={css.file_label} htmlFor="uploadBtn">
                                    <FaFileUpload/>
                                    Upload photo
                                </label>
                            </div>
                            <div className={css.errors_span}>{errors.title && <span>{errors.title.message}</span>}</div>
                            <div className={css.input_box}>
                                <div className={css.input_box_name}>Title:</div>
                                <input className={css.title_input} type="text"
                                       {...register('title')}
                                       required
                                       placeholder={'Title'}
                                />
                            </div>
                            <div className={css.errors_span}>{errors.text &&
                                <span>{errors.text.message}</span>}</div>
                            <div className={css.input_box}>
                                <div className={css.input_box_name}>Text:</div>
                                <textarea className={css.text_input}
                                          rows={5}
                                          cols={15}
                                          {...register('text')}
                                          required
                                          placeholder={'Text'}
                                />
                            </div>
                            <div className={css.form_submit_box}>
                                <input className={theme === true ? css.confirm_input_dark : css.confirm_input}
                                       type="submit"
                                       value={
                                           postDataToUpdate
                                               ? 'Update'
                                               : 'Create'
                                       }
                                />
                                {
                                    postDataToUpdate
                                        ?
                                        <button onClick={() => clearForm()}
                                                className={theme === true ? css.confirm_input_dark : css.confirm_input}
                                        >
                                            Clear
                                        </button>
                                        :
                                        <></>
                                }
                            </div>
                        </form>
                    </>
            }
        </div>
    );
};

export {CreatePostPage};
