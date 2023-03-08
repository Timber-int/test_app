import Carousel from 'nuka-carousel';
import React from 'react';
import Photo_first from '../assets/dwdvfx---c16x8x50px50p--072c9ca3b3e383774310f909630abf80.png'
import Photo_second from '../assets/hkbyyq---c16x8x50px50p--5eb420028b3148e98202039f61ae5f86.png'
import Photo_third from '../assets/um26ev---c16x8x50px50p--b409593d222eb683f7fdbded01bdf053.png'

const MainCarousel = () => {
    return (
        <Carousel autoplay={true} animation={'zoom'}>
            <img src={Photo_first} alt='photo'/>
            <img src={Photo_second} alt='photo'/>
            <img src={Photo_third} alt='photo'/>
        </Carousel>
    );
};

export {MainCarousel};
