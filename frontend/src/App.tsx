import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Layout, ProductDetails, SelectedProducts} from "./components";
import {RequireAuth} from './components/hoc/RequireAuth';
import {
    AuthPage,
    GenderCategoryPage,
    LoginPage,
    MenuPage,
    ProductsByGenderCategoryPage,
    RegistrationPage
} from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/menu'} element={<MenuPage/>}>
                    <Route path={'/menu/category/:id'} element={<GenderCategoryPage/>}/>
                </Route>
                <Route path={'/productDetails/:id'} element={<ProductDetails/>}/>
                <Route path={'/products/:id'} element={<ProductsByGenderCategoryPage/>}/>
                <Route path={'/selectedProducts'} element={<RequireAuth><SelectedProducts/></RequireAuth>}/>
                <Route path={'/auth'} element={<AuthPage/>}>
                    <Route path={'/auth/registration'} element={<RegistrationPage/>}/>
                    <Route path={'/auth'} element={<LoginPage/>}/>
                </Route>
            </Route>
        </Routes>
    );
};

export {App};
