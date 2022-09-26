import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import css from './ProductDetailsPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getAllComments} from "../../store/commentSlice";
import {Comment} from "../../components";
import {CreateCommentForm} from "../../components/CreateCommentForm/CreateCommentForm";

const ProductDetailsPage = () => {

    const {state: productDetails} = useLocation();

    const {width, weight, name, imageUrl, height, id, count} = productDetails;

    const dispatch = useDispatch();

    const {comments} = useSelector(state => state['commentReducer']);

    useEffect(() => {
        dispatch(getAllComments());
    }, [id]);

    return (
        <div className={css.product_details_container}>
            <div className={css.first_block}>
                <img className={css.product_image} src={imageUrl} alt='productPhoto'/>
            </div>
            <div className={css.second_block}>
                <div>Name: <span className={css.product_element}> {name}</span></div>
                <div>
                    <ul>
                        <li>Width: <span className={css.product_element}>{width}</span></li>
                        <li>Height: <span className={css.product_element}>{height}</span></li>
                    </ul>
                </div>
                <div>Weight: <span className={css.product_element}>{weight}</span></div>
                <div>Count: <span className={css.product_element}>{count}</span></div>
            </div>
            <div className={css.third_block}>
                <div className={css.comment_container}>
                    <div className={css.comment_first_block}>
                        <div className={css.comments_box}>
                            {
                                comments.filter((comment) => comment.productId === id).map((comment, index) => <Comment
                                    key={comment.id} comment={comment} numberComment={index + 1}/>
                                )
                            }
                        </div>

                    </div>
                    <div className={css.comment_second_block}>
                        <CreateCommentForm productId={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {ProductDetailsPage};
