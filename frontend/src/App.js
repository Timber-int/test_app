import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css'

import {Layout} from './components';
import {CreatePostPage, LoginPage, PostPageDetails, PostsPage, RegistrationPage, UserPostsPage} from "./pages";
import {RequireAuth} from "./components/hoc";

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'posts'} element={<PostsPage/>}/>
                <Route path={'posts/:id'} element={<RequireAuth><PostPageDetails/></RequireAuth>}/>
                <Route path={'userPosts'} element={<RequireAuth><UserPostsPage/></RequireAuth>}/>
                <Route path={'createPost'} element={<RequireAuth><CreatePostPage/></RequireAuth>}/>
            </Route>
        </Routes>
    );
};

export {App};
