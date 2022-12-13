import React, {useEffect, useRef, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {CarouselControl, Image, Loading} from "../../components";
import {getAllPosts} from "../../store";
import {CONSTANTS} from "../../constants";
import css from './ImageCarouselPage.module.css';

const ImageCarouselPage = () => {

        const slideInterval = useRef();

        const {posts: slides, serverErrors, status, itemCount} = useSelector(state => state.postReducer);

        const dispatch = useDispatch();

        const [currentSlide, setCurrentSlide] = useState(0);

        const prev = () => {
            startSlideTimer();
            const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
            setCurrentSlide(index)
        }
        const next = () => {
            startSlideTimer();
            const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            setCurrentSlide(index)
        }

        const startSlideTimer = () => {
            stopSlideTimer();
            slideInterval.current = setInterval(() => {
                setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
            }, 3000);
        };

        const stopSlideTimer = () => {
            if (slideInterval.current) {
                clearInterval(slideInterval.current);
            }
        };

        useEffect(() => {
            startSlideTimer();

            dispatch(getAllPosts({page: 1, perPage: itemCount, title: ''}));

            return () => stopSlideTimer();
        }, [itemCount]);


        return (
            <>
                {
                    serverErrors && <div className={css.server_error}>{serverErrors}</div>
                }
                {
                    status === CONSTANTS.LOADING
                        ?
                        <Loading/>
                        :
                        slides.length
                            ?
                            <div className={css.carousel}>
                                <div
                                    className={css.carousel_inner}
                                    style={{transform: `translateX(${-currentSlide * 100}%)`}}
                                >
                                    {slides.map((slide, index) => (
                                            <Image
                                                key={index}
                                                slide={slide}
                                                stopSlide={stopSlideTimer}
                                                startSlide={startSlideTimer}
                                            />
                                        )
                                    )}
                                </div>
                                <CarouselControl next={next} prev={prev}/>
                            </div>
                            :
                            <div className={css.slides_container_empty}>
                                Slides empty
                            </div>
                }
            </>
        );
    }
;

export {ImageCarouselPage};
