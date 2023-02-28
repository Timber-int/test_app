import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components";
import {GenderCategoryPage, MenuPage, ProductsPage} from "./pages";

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/menu'} element={<MenuPage/>}>
                    <Route path={'/menu/category/:id'} element={<GenderCategoryPage/>}/>
                </Route>
                <Route path={'/products/:id'} element={<ProductsPage/>}/>
            </Route>

        </Routes>
    );
};

export {App};
