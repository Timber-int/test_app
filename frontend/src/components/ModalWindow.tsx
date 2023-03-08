import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import styled from "styled-components";
import {productActions} from '../store/slices/productSlice';
import {RxCross2} from 'react-icons/rx'
import {CONSTANTS} from '../constants';

const ModalWindow = () => {

    const [content, setContent] = useState<string>(CONSTANTS.SIZE);

    const dispatch = useAppDispatch();

    const {showModalWindow} = useAppSelector(state => state.productReducer);

    const rootClasses = ['modal_window'];

    if (showModalWindow) {
        rootClasses.push('active');
    }

    return (
        <Container className={rootClasses.join(' ')} onClick={() => dispatch(productActions.setShowModalWindow())}>
            <div className='modal_window_content' onClick={event => event.stopPropagation()}>
                <div className='modal_window_container'>
                    <div className='header'>
                        <div className='title'>
                            Select the size
                        </div>
                        <div className='exit' onClick={() => dispatch(productActions.setShowModalWindow())}>
                            <RxCross2/>
                        </div>
                    </div>
                    <div className='menu'>
                        <button className={content !== CONSTANTS.SIZE ? 'menu_button' : 'menu_button_active'}
                                onClick={() => setContent(CONSTANTS.SIZE)}>
                            Size chat
                        </button>
                        <button className={content !== CONSTANTS.MEASURE ? 'menu_button' : 'menu_button_active'}
                                onClick={() => setContent(CONSTANTS.MEASURE)}>
                            How to measure
                        </button>
                    </div>
                    <div className='content'>
                        {
                            content === CONSTANTS.SIZE
                                ?
                                <div className='first_content'>
                                    <div className='element'>
                                        <div>Brand size</div>
                                        <div>Foot length</div>
                                    </div>
                                    <div className='element'>
                                        <div>35</div>
                                        <div>22.5 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>36</div>
                                        <div>23 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>37</div>
                                        <div>23.5 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>38</div>
                                        <div>24 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>39</div>
                                        <div>24.5 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>40</div>
                                        <div>25 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>41</div>
                                        <div>25.5 sm</div>
                                    </div>
                                    <div className='element'>
                                        <div>42</div>
                                        <div>26 sm</div>
                                    </div>
                                </div>
                                :
                                <div className='second_content'>
                                    <div className='image_container'>
                                        <img
                                            src='https://s.estro.ua/static/content/thumbs/300x221/1/05/i43kgr---c300x221x50px50p--0bd1f91d47fcbe316641344aa0a3b051.jpeg'
                                            alt='photo'
                                        />
                                    </div>
                                    <div className='image_container'>
                                        <div>1) Measure the leg at the end of the day or after physical activity, when
                                            the
                                            length of the foot is close to its maximum values.
                                        </div>

                                        <div>2) Stand on the paper, circle its contour with a pencil and make a mark on
                                            the
                                            paper in the place where the big toe and the heel end. It is important! The
                                            mark
                                            may go beyond the contour of the foot.
                                        </div>

                                        <div>3) Measure the distance between the marks - this will be your foot
                                            length.
                                        </div>

                                        <div>4) After measurement, <span> add 3-5 mm to the obtained result for more
                                            comfortable
                                            wearing.
                                        </span>
                                        </div>

                                        <div>Please note: the length of the foot and the length of the insole are
                                            different
                                            values, they do not match for the same shoe size. Pay attention to the value
                                            indicated by the manufacturer - this will help you correctly determine the
                                            required shoe size.
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: none;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;

  &.active {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal_window_content {
    padding: 2.5vh;
    background-color: #ffffff;
    border-radius: 1.5vh;
    width: 40%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 5;

    .modal_window_container {
      width: 100%;
      display: flex;
      flex-direction: column;

      .header {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;

        .title {
          font-weight: bold;
          font-size: 3vh;
        }

        .exit {
          position: absolute;
          top: 0.5vh;
          right: 0;
          font-size: 3vh;

          &:hover {
            color: #857b7b;
            cursor: pointer;
          }
        }
      }

      .menu {
        width: 100%;
        display: flex;
        margin-top: 3vh;

        .menu_button {
          width: 50%;
          color: #000000;
          cursor: pointer;
          background-color: #f8f8f8;
          height: 5vh;
          border: none;
          font-weight: bold;
        }

        .menu_button_active {
          width: 50%;
          color: #FFF;
          cursor: pointer;
          background-color: #000000;
          height: 5vh;
          border: none;
          font-weight: bold;
        }
      }

      .content {
        width: 100%;
        display: flex;
        justify-content: center;

        .first_content {
          margin-top: 2vh;
          width: 90%;
          display: flex;
          justify-content: center;
          border-radius: 1.5vh;
          flex-wrap: wrap;

          .element {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            &:first-child, & > div:first-child {
              font-weight: bold;
            }

            & > div {
              border: 0.1vh solid #eaeaea;
              width: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }

        .second_content {
          width: 100%;
          display: flex;
          justify-content: center;

          .image_container {
            width: 45%;
            padding: 2vh;
            display: flex;
            flex-direction: column;
          }

          .image_container {
            width: 45%;
            padding: 2vh;
            display: flex;
            flex-direction: column;

            & > div:not(:first-child) {
              margin-top: 1vh;

              span {
                font-weight: bold;
              }
            }
          }
        }
      }

    }
  }
`

export {ModalWindow};
