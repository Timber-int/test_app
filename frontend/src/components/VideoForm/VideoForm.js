import React from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";
import {FaFileUpload} from "react-icons/fa";
import css from "./VideoForm.module.css";

const VideoForm = () => {

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: {errors},
    // } = useForm({
    //     resolver: joiResolver(videoValidateForCreate),
    //     mode: 'onTouched',
    // });
    //
    // const {theme} = useSelector(state => state.postReducer);
    //
    // const {user} = useSelector(state => state.authReducer);
    //
    // const dispatch = useDispatch();
    //
    // const submit = (data) => {
    //     dispatch(createVideo({userId: user.id, postId: post.id, video: data.video}));
    //     reset();
    // }

    return (
        <form >
            {/*<div className={css.errors_span}>{errors.video && <span>{errors.video.message}</span>}</div>*/}
            {/*<div className={css.file_input_box}>*/}
            {/*    <input className={css.file_input}*/}
            {/*           type="file"*/}
            {/*           id="uploadVideoBtn"*/}
            {/*           {...register('video')}*/}
            {/*           placeholder={'video...'}*/}
            {/*           required={true}*/}
            {/*    />*/}
            {/*    <label className={css.file_label} htmlFor="uploadVideoBtn">*/}
            {/*        <FaFileUpload/>*/}
            {/*        Upload video*/}
            {/*    </label>*/}
            {/*</div>*/}
            {/*<div className={css.form_submit_box}>*/}
            {/*    <input className={theme === true ? css.confirm_input_dark : css.confirm_input}*/}
            {/*           type="submit"*/}
            {/*           value={'Upload video'}*/}
            {/*    />*/}
            {/*</div>*/}
        </form>
    );
};

export {VideoForm};
