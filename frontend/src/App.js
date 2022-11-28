import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css'

import {Layout, RequireAuth} from './components';
import {
    CreatePostPage,
    ImageCarouselPage,
    LoginPage,
    PostPageDetails,
    PostsPage,
    RegistrationPage,
    UserPostsPage
} from "./pages";

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'posts'} element={<PostsPage/>}/>
                <Route path={'carousel'} element={<ImageCarouselPage/>}/>
                <Route path={'posts/:id'} element={<RequireAuth><PostPageDetails/></RequireAuth>}/>
                <Route path={'userPosts'} element={<RequireAuth><UserPostsPage/></RequireAuth>}/>
                <Route path={'createPost'} element={<RequireAuth><CreatePostPage/></RequireAuth>}/>
            </Route>
        </Routes>
    );
};

export {App};
