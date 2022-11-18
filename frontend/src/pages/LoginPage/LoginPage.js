import React ,{useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi/dist/joi";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../components";
import {CONSTANTS} from "../../constants";
import {userBodyForLoginValidator} from "../../validator";
import {login} from "../../store";
import css from "../RegistrationPage/RegistrationPage.module.css";

const LoginPage = () => {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: joiResolver(userBodyForLoginValidator),
        mode: 'onTouched',
    });

    const dispatch = useDispatch();

    const {status, serverErrors} = useSelector(state => state.authReducer);

    const submit = (data) => {
        dispatch(login({loginData: data}));

        reset();

        if (status === CONSTANTS.RESOLVED) {
            navigate('/userPosts');
        }
    }

    return (
        <div>
            {
                serverErrors && <div className={css.server_error}>{serverErrors}</div>
            }
            {status === CONSTANTS.LOADING ? <Loading/> :
                <>
                    <div className={css.registration_value_container}>Authorization</div>
                    <form onSubmit={handleSubmit(submit)}>
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
                            <input className={css.confirm_input} type="submit" value={'Confirm'}/>
                            <NavLink className={css.nav_to_login} to={'/registration'}>I don't have account?</NavLink>
                        </div>
                    </form>
                </>
            }
        </div>
    );
};

export {LoginPage};
