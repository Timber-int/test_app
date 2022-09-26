import React from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {createCommentValidator, createProductValidator} from "../../validator";
import {createProduct} from "../../store";
import {useDispatch} from "react-redux";
import {createComment} from "../../store/commentSlice";
import css from "../CreateProductForm/CreateProductForm.module.css";

const CreateCommentForm = ({productId}) => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(createCommentValidator),
        mode: 'onTouched',
    });

    const confirm = (data) => {
        dispatch(createComment({commentData: {...data, productId}}));
        reset();
    }
    return (
        <div>
            <form onSubmit={handleSubmit(confirm)}>
                <div className={css.errors_span}>{errors.description && <span>{errors.description.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input} type="text" {...register('description')}
                                                      required placeholder={'description'}/>
                </div>
                <div className={css.input_box}><input className={css.product_button_confirm} type="submit"
                                                      value={'Сonfirm'}/>
                </div>
            </form>
        </div>
    );
};

export {CreateCommentForm};
