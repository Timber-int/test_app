import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {BsSunFill} from 'react-icons/bs';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import Switch from 'react-switch';

import {CONSTANTS} from "../../constants";
import {dishesActions, logout} from "../../store";
import css from './Layout.module.css'
import {categoryActions, getAllCategory} from "../../store/categorySlice";
import {baseURL} from "../../config";

const Layout = () => {

    const {user, status} = useSelector(state => state.authReducer);

    const {category, theme} = useSelector(state => state.categoryReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutUser = () => {
        if (user) {
            dispatch(logout());
        }
    }

    const toggleTheme = () => {
        dispatch(categoryActions.setTheme());
    }

    useEffect(() => {
        dispatch(getAllCategory());
        if (status === CONSTANTS.RESOLVED) {
            navigate('/registration');
        }
    }, [user, status]);

    useEffect(() => {

    }, [theme]);

    const clear = () => {
        dispatch(dishesActions.clearSearchData());
    }

    return (
        <div className={theme === true ? css.blog_container_dark : css.blog_container}>
            <div className={theme === true ? css.header_dark : css.header}>
                <div className={css.user_box}>
                    {
                        user ?
                            <NavLink className={theme === true ? css.user_data_box_dark : css.user_data_box}
                                     to={'/registration'}>
                                {user?.lastName[0].toUpperCase()}{user?.firstName[0].toUpperCase()}
                            </NavLink>
                            :
                            <NavLink className={theme === true ? css.user_data_box_dark : css.user_data_box}
                                     to={'/registration'}>

                            </NavLink>
                    }
                    <NavLink to={'/registration'}>
                        <button className={theme === true ? css.enter_exit_button_dark : css.enter_exit_button}
                                onClick={() => logoutUser()}>{localStorage.getItem(CONSTANTS.USER) ? 'Exit' : 'Enter'}
                        </button>
                    </NavLink>
                </div>
                <div className={css.menu}>
                    {
                        category.map(categoryElement => (
                            <NavLink key={categoryElement.id}
                                     to={'/category/' + categoryElement.id}
                                     state={categoryElement}
                                     className={css.single_category_element}
                                     onClick={() => clear()}
                            >
                                <div>
                                    <img className={css.category_image} src={baseURL + '/' + categoryElement.photo}
                                         alt={categoryElement.name}
                                    />
                                </div>
                                <div>{categoryElement.name}</div>
                            </NavLink>
                        ))
                    }
                </div>
                <div>
                    <Switch
                        className={css.switch}
                        onChange={toggleTheme}
                        checked={Boolean(theme)}
                        uncheckedIcon={<BsFillMoonStarsFill className={css.icons}/>}
                        checkedIcon={<BsSunFill className={css.icons}/>}
                        onColor={'#141E30'}
                        offColor={'#141E30'}
                        width={60}
                        height={32}
                    />
                </div>
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
        </div>
    );
};

export {Layout};
