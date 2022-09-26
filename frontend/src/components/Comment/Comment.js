import React from 'react';

import css from './Comment.module.css';
import {useDispatch} from "react-redux";
import {deleteCommentById} from "../../store/commentSlice";

const Comment = ({comment, numberComment}) => {

    const {description, id, createdAt: data} = comment;

    const dispatch = useDispatch();

    const deleteComment = (commentId) => {
        dispatch(deleteCommentById({commentId}))
    }

    return (
        <div className={css.comment_box}>
            <div className={css.comment_information}>
                <div>
                    <span>{numberComment}</span>)
                    <span>{description}</span>
                </div>
                <div>Data: {data}</div>
            </div>

            <div>
                <button className={css.delete_button} onClick={() => deleteComment(id)}>Delete comment</button>
            </div>
        </div>
    );
};

export {Comment};
