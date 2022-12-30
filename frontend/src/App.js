import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css'

import {Layout, RequireAuth} from './components';
import {
    CategoryDishesPage,
    CategoryPage,
    ImageCarouselPage,
    LoginPage,
    RegistrationPage,
} from "./pages";

const App = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/category');
    }, []);

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'category'} element={<CategoryPage/>}/>
                <Route path={'category/:id'} element={<CategoryDishesPage/>}/>
                <Route path={'carousel'} element={<ImageCarouselPage/>}/>
            </Route>
        </Routes>
    );
};

export {App};
