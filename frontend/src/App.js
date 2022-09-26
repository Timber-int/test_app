import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css'

import {Layout} from './components';
import {ProductDetailsPage, ProductsPage} from "./pages";

const App = () => {

    return (
       <Routes>
           <Route path={'/'} element={<Layout/>}>
               <Route index element={<ProductsPage/>}/>
               <Route path={'products/:id'} element={<ProductDetailsPage/>}/>
           </Route>
       </Routes>
    );
};

export {App};
