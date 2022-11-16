import React from 'react';
import css from './Loading.module.css';

const Loading = () => {
    return (
        <div className={css.loader}>
            <span/>
            <span/>
            <span/>
            <span/>
        </div>
    );
};

export {Loading};
