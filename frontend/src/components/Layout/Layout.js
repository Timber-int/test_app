import React from 'react';
import {Outlet} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
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
            <div className={css.menu_block}></div>
            <div className={css.content_block}>
                <div className={css.content}>
                    <div className={css.search_bar}>
                        SearchBar
                    </div>
                    <div className={css.outlet}>
                        <Outlet/>
                    </div>
                </div>
                <div className={css.top_play}>

                </div>
            </div>
        </div>
    );
};

export {Layout};
