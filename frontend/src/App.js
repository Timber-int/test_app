import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css'

import {Layout, RequireAuth} from './components';
import {
    CreatePostPage,
    ImageCarouselPage,
    LoginPage,
    PostPageDetails,
    PostsPage,
    RegistrationPage,
    UserPostsPage, VideoPage
} from "./pages";

const App = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/posts');
    }, []);

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
                <Route path={'video'} element={<VideoPage/>}/>
            </Route>
        </Routes>
    );
};

export {App};
