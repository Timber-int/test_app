import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {baseURL} from "../../config";
import {deletePostById, getAllComments, postActions} from "../../store";
import {FaRegCommentDots} from 'react-icons/fa';
import {SlEyeglass} from 'react-icons/sl';
import {AiTwotoneDelete} from 'react-icons/ai';
import {RiFileEditFill} from 'react-icons/ri';
import {NavLink, useNavigate} from "react-router-dom";
import css from './Post.module.css';
import {ModalWindow} from "../ModalWindow/ModalWindow";

const Post = ({post, margin, textLength, textHigh, isUserPost}) => {

    const {
        id,
        title,
        text,
        photo,
        userId,
        views,
        authorFirstName,
        authorLastName,
        createdAt,
    } = post;

    const navigate = useNavigate();

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    const data = new Date(createdAt);

    const dispatch = useDispatch();

    const {comments} = useSelector(state => state.commentReducer);

    const {visible} = useSelector(state => state.postReducer);

    useEffect(() => {
        dispatch(getAllComments());
    }, []);

    const deletePost = (id) => {
        dispatch(deletePostById({id}));
    }

    const editPost = (postData) => {
        dispatch(postActions.setPostDataToUpdate({postData}));
        navigate('/createPost');
    }

    const setModalWindow = (text) => {
        dispatch(postActions.setShowWindow({text}));
    }

    return (
        <>
            {
                visible
                ?
                    <ModalWindow/>
                    :
        <div className={margin ? css.post_element_with_margin : css.post_element_without_margin}>
            <NavLink to={'/posts/' + post.id} state={post} className={css.post_image_block}>
                <img className={css.image_block} src={baseURL + '/' + photo} alt={title}/>
                <div className={css.information_container}>
                    <div className={css.author}>{authorLastName} {authorFirstName}</div>
                    <div className={css.data}>{data.toLocaleDateString("en-US", options)}</div>
                </div>
            </NavLink>
            <div className={css.post_title}>
                {title}
            </div>
            <div onClick={() => setModalWindow(text)}
                 className={textHigh ? css.post_text_with_full_height : css.post_text}>
                {
                    text.substr(0, textLength).concat(!textHigh ? '....' : '')
                }
            </div>

            <div className={css.comments_views_container}>
                <div className={css.post_information_container}>
                    <div>
                        <FaRegCommentDots/> <span>{comments.filter(comment => comment.postId === id).length}</span>
                    </div>
                    <div>
                        <SlEyeglass/> <span>{views}</span>
                    </div>
                </div>
                <div
                    className={isUserPost ? css.updated_post_button_container : css.updated_post_button_container_not_show}>
                    <div onClick={() => editPost(post)}><RiFileEditFill/></div>
                    <div onClick={() => deletePost(post.id)}><AiTwotoneDelete/></div>
                </div>
            </div>
        </div>
            }
        </>
    );
};

export {Post};
