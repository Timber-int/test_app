import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {CONSTANTS} from "../../constants";
import {logout} from "../../store";
import css from './Layout.module.css'

const Layout = () => {

    const {user, status} = useSelector(state => state.authReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutUser = () => {
        if (user) {
            dispatch(logout());
        }
    }
    useEffect(() => {
        if (status === CONSTANTS.RESOLVED) {
            navigate('/registration');
        }
    }, [user, status]);

    return (
        <div className={css.blog_container}>
            <div className={css.header}>
                {
                    user ?
                        <NavLink className={css.user_data_box} to={'/registration'}>
                            {user?.firstName[0].toUpperCase()}{user?.lastName[0].toUpperCase()}
                        </NavLink>
                        :
                        <NavLink className={css.user_data_box} to={'/registration'}>

                        </NavLink>
                }
                <div className={css.menu}>
                    <NavLink to={'/posts'}>
                        Main
                    </NavLink>
                    <NavLink to={'/userPosts'}>
                        My post
                    </NavLink>
                    <NavLink to={'/createPost'}>
                        Add post
                    </NavLink>
                </div>
                <NavLink to={'/registration'}>
                    <button className={css.enter_exit_button}
                            onClick={() => logoutUser()}>{localStorage.getItem(CONSTANTS.USER) ? 'Exit' : 'Enter'}
                    </button>
                </NavLink>
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
        </div>
    );
};

export {Layout};
