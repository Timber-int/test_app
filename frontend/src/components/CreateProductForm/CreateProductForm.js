import React from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";

import {createProductValidator} from "../../validator";
import css from './CreateProductForm.module.css';
import {createProduct} from "../../store";

const CreateProductForm = () => {

    const dispatch = useDispatch();

    const {
        status,
        serverErrors,
    } = useSelector(state => state['productReducer']);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(createProductValidator),
        mode: 'onTouched',
    });

    const confirm = (data) => {
        dispatch(createProduct({productData: data}));
        reset();
    }

    const cancel = () => {
        reset();
    }


    return (
        <div>
            <form onSubmit={handleSubmit(confirm)}>
                <div className={css.errors_span}>{errors.imageUrl && <span>{errors.imageUrl.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input} type="url" {...register('imageUrl')}
                                                      required placeholder={'imageUrl'}/></div>
                <div className={css.errors_span}>{errors.name && <span>{errors.name.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input} type="text" {...register('name')}
                                                      required placeholder={'lastName'}/></div>
                <div className={css.errors_span}>{errors.count && <span>{errors.count.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input} type="number" {...register('count')}
                                                      required placeholder={'count'}/></div>
                <div className={css.errors_span}>{errors.width && <span>{errors.width.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input} type="number" {...register('width')}
                                                      required placeholder={'width'}/></div>
                <div className={css.errors_span}>{errors.height && <span>{errors.height.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input}
                                                      type="number" {...register('height')}
                                                      required placeholder={'height'}/></div>
                <div className={css.errors_span}>{errors.weight && <span>{errors.weight.message}</span>}</div>
                <div className={css.input_box}><input className={css.product_input}
                                                      type="number" {...register('weight')}
                                                      required placeholder={'weight'}/></div>

                <div className={css.input_box}><input className={css.product_button_confirm} type="submit"
                                                      value={'Сonfirm'}/>
                </div>
            </form>
            <div className={css.input_box}>
                <button className={css.product_button_cancel} onClick={() => cancel()}>Cancel</button>
            </div>
        </div>

    );
};

export {CreateProductForm};
