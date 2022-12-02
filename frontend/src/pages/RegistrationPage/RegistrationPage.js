import React, {useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {Loading} from "../../components";
import {useDispatch, useSelector} from "react-redux";

import {userBodyForRegistrationValidator} from "../../validator";
import {registration} from "../../store";
import {CONSTANTS} from "../../constants";
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(userBodyForRegistrationValidator),
        mode: 'onTouched',
    });

    const dispatch = useDispatch();

    const {status, serverErrors} = useSelector(state => state.authReducer);

    const {theme} = useSelector(state => state.postReducer);

    const submit = (data) => {
        dispatch(registration({registrationData: data}));

        if (status === CONSTANTS.RESOLVED) {
            navigate('/userPosts');
        }

        reset();
    }

    useEffect(() => {
    }, [theme]);

    return (
        <div>
            {
                serverErrors && <div className={css.server_error}>{serverErrors}</div>
            }
            {status === CONSTANTS.LOADING ? <Loading/> :
                <>
                    <div className={css.registration_value_container}>Registration</div>
                    <form onSubmit={handleSubmit(submit)} className={css.registration_form}>
                        <div className={css.errors_span}>{errors.firstName &&
                            <span>{errors.firstName.message}</span>}</div>
                        <div className={css.input_box}>
                            <div className={css.input_box_name}>Firstname:</div>
                            <input className={css.registration_input}
                                   type="text" {...register('firstName')} required
                                   placeholder={'FirstName'}
                            />
                        </div>
                        <div className={css.errors_span}>{errors.lastName &&
                            <span>{errors.lastName.message}</span>}</div>
                        <div className={css.input_box}>
                            <div className={css.input_box_name}>Lastname:</div>
                            <input className={css.registration_input}
                                   type="text" {...register('lastName')} required
                                   placeholder={'LastName'}
                            />
                        </div>
                        <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
                        <div className={css.input_box}>
                            <div className={css.input_box_name}>Email:</div>
                            <input className={css.registration_input} type="email" {...register('email')}
                                   required
                                   placeholder={'Email'}
                            />
                        </div>
                        <div className={css.errors_span}>{errors.password &&
                            <span>{errors.password.message}</span>}</div>
                        <div className={css.input_box}>
                            <div className={css.input_box_name}>Password:</div>
                            <input className={css.registration_input}
                                   type="text" {...register('password')} required
                                   placeholder={'Password'}
                            />
                        </div>
                        <div className={css.form_submit_box}>
                            <input className={theme === true ? css.confirm_input_dark : css.confirm_input} type="submit"
                                   value={'Confirm'}/>
                            <NavLink className={theme === true ? css.nav_to_login_dark :css.nav_to_login} to={'/login'}>I already have account?</NavLink>
                        </div>
                    </form>
                </>
            }
        </div>
    );
};

export {RegistrationPage};
