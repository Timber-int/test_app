import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";

import {createProductValidator} from "../../validator";
import css from './CreateProductForm.module.css';
import {createProduct, productActions, updateProductById} from "../../store";

const CreateProductForm = () => {

    const dispatch = useDispatch();

    const {
        productDataToUpdate,
    } = useSelector(state => state['productReducer']);

    const {width, weight, name, imageUrl, height, id, count} = productDataToUpdate;

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        setValue,
    } = useForm({
        resolver: joiResolver(createProductValidator),
        mode: 'onTouched',
    });

    useEffect(() => {
        setValue('width', width);
        setValue('weight', weight);
        setValue('name', name);
        setValue('imageUrl', imageUrl);
        setValue('height', height);
        setValue('count', count);
    }, [id]);

    const confirm = (data) => {
        if (id){
            dispatch(updateProductById({productData: {...data,id}}));
            reset();
        }else {
            dispatch(createProduct({productData: data}));
            reset();
        }
    }

    const cancel = () => {
        dispatch(productActions.clearProductDataToUpdate());
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
                                                      value={id ? 'Update' : 'Сonfirm'}/>
                </div>
            </form>
            <div className={css.input_box}>
                <button className={css.product_button_cancel} onClick={() => cancel()}>Cancel</button>
            </div>
        </div>

    );
};

export {CreateProductForm};
