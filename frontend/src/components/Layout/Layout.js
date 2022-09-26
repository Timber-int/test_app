import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import css from './Layout.module.css'

const Layout = () => {
    return (
        <div>
            <div>
                <NavLink to={'/'}>Products</NavLink>
            </div>
            <div className={css.outlet_container}>
                <Outlet/>
            </div>
        </div>
    );
};

export {Layout};
