import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css'

import {Layout} from './components';
import {LoginPage, RegistrationPage} from "./pages";

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
};

export {App};
