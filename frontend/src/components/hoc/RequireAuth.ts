import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks";

interface IChildrenProps {
    children: any;
}

const RequireAuth = ({children}: IChildrenProps) => {
    const navigate = useNavigate();

    const {
        user,
    } = useAppSelector(state => state.authReducer);

    if (!user) {
        navigate('/auth', {replace: true});
    }

    return children;
};

export {RequireAuth};
