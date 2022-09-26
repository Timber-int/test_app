import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import css from './Layout.module.css'
import {ModalWindow} from "../ModalWindow/ModalWindow";
import {useSelector} from "react-redux";

const Layout = () => {

    const { showWindow} = useSelector(state => state['productReducer']);

    return (
        <div>
            <div className={css.header}>
                <NavLink to={'/'}>Products</NavLink>
            </div>
            <div>
                {
                    showWindow === true
                        ?
                        <ModalWindow/>
                        :
                        <></>
                }
            </div>
            <div className={css.outlet_container}>
                <Outlet/>
            </div>
        </div>
    );
};

export {Layout};
