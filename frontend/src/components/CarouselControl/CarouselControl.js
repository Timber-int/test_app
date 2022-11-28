import React from 'react';

import css from './CarouselControl.module.css';

const CarouselControl = ({next, prev}) => {
    return (
        <div>
            <button className={css.carousel_control_left} onClick={prev}>Prev</button>
            <button className={css.carousel_control_right} onClick={next}>Next</button>
        </div>
    );
};

export {CarouselControl};
