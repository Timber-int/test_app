import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {CONSTANTS} from "../../constants";
import {logout} from "../../store";
import css from './Layout.module.css'

const Layout = () => {

    const {user, status} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const logoutUser = () => {
        if (user) {
            dispatch(logout());
        }
    }

    return (
        <div className={css.blog_container}>
            <div className={css.header}>
                {
                    user ?
                        <NavLink className={css.user_data_box} to={'/login'}>
                            {user?.firstName[0].toUpperCase()}{user?.lastName[0].toUpperCase()}
                        </NavLink>
                        :
                        <NavLink className={css.user_data_box} to={'/login'}>

                        </NavLink>
                }
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
            <div className={css.footer}>

            </div>
        </div>
    );
};

export {Layout};
