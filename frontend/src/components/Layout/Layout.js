import React, {useEffect} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {BsSunFill} from 'react-icons/bs';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import Switch from 'react-switch';

import {CONSTANTS} from "../../constants";
import {logout, postActions} from "../../store";
import css from './Layout.module.css'

const Layout = () => {

    const {user, status} = useSelector(state => state.authReducer);

    const {theme} = useSelector(state => state.postReducer);

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

    useEffect(() => {

    }, [theme]);

    const toggleTheme = () => {
        dispatch(postActions.setTheme());
    }

    return (
        <div className={theme === true ? css.blog_container_dark : css.blog_container}>
            <div className={theme === true ? css.header_dark : css.header}>
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
                <div className={theme === true ? css.information_menu_dark : css.information_menu}>
                    <div className={css.information_path}>
                        <div className={css.text}>
                            Information
                        </div>
                    </div>
                    <div className={css.information_drop_down_menu}>
                        <NavLink className={css.information_drop_down_path} to={'/carousel'}>Images</NavLink>
                        <NavLink className={css.information_drop_down_path} to={'/video'}>Video</NavLink>
                    </div>
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
                <NavLink to={'/registration'}>
                    <button className={theme === true ? css.enter_exit_button_dark : css.enter_exit_button}
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
