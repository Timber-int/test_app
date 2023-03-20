import React from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from "../hooks";
import {productActions} from "../store/slices/productSlice";
import {RxCross2} from "react-icons/rx";
import {MdDelete} from "react-icons/md";
import {baseURL} from "../config";
import {NavLink, useNavigate} from 'react-router-dom';

const BucketModalWindow = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {showBucketModalWindow, productsBucket} = useAppSelector(state => state.productReducer);

    const rootClasses = ['modal_window'];

    if (showBucketModalWindow) {
        rootClasses.push('active');
    }

    const moveToOrderPage = () => {
        dispatch(productActions.setShowBucketModalWindow());
        navigate('/orderPage', {replace: true});
    }

    return (
        <Container className={rootClasses.join(' ')}
                   onClick={() => dispatch(productActions.setShowBucketModalWindow())}>
            <div className='modal_window_content' onClick={event => event.stopPropagation()}>
                <div className='modal_window_container'>
                    <div className='header'>
                        <div className='title'>
                            Your order ({productsBucket.reduce((acc, element) => {
                            return acc + element.count;
                        }, 0)})
                        </div>
                        <div className='exit' onClick={() => dispatch(productActions.setShowBucketModalWindow())}>
                            <RxCross2/>
                        </div>
                    </div>
                    <div className='container'>
                        {
                            productsBucket.map(product => (
                                <div className='box' key={product.createdAtId}>
                                    <hr/>
                                    <div className=' product_box'>
                                        <div className=' product_photo_box'>
                                            <img className=' photo' src={baseURL + '/' + product.photo}
                                                 alt={product.title}/>
                                        </div>
                                        <div className='product_details_box'>
                                            <div className='code_container'>
                                                <div className='code'>#00010101</div>
                                                <div className='delete_button'
                                                     onClick={() => dispatch(productActions.deleteProductFromProductBucket({createdAtId: product.createdAtId}))}>
                                                    <MdDelete/>
                                                </div>
                                            </div>
                                            <NavLink to={'/productDetails/' + product.id}
                                                     className='product_title'
                                                     state={{...product, price: product.price / product.count}}
                                                     onClick={() => dispatch(productActions.setShowBucketModalWindow())}
                                            >
                                                {product.title}
                                            </NavLink>
                                            <div className='details_container'>
                                                <div>Size: <span className='details_data'>{product.size}</span></div>
                                                <div>Color: <span className='details_data'>black</span></div>
                                            </div>
                                            <div className='update_container'>
                                                <div className='update_box'>
                                                    <span className='update_button'
                                                          onClick={() => dispatch(productActions.minusProductProductsBucket({product}))}
                                                    >
                                                        -
                                                    </span>
                                                    <span>{product.count}</span>
                                                    <span className='update_button'
                                                          onClick={() => dispatch(productActions.plusProductProductsBucket({product}))}
                                                    >
                                                        +
                                                    </span>
                                                </div>
                                                <div className='product_price'>{product.price} UAH</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <hr/>
                    </div>

                    <div className='price_container'>
                        <div className='price_title'>To pay</div>
                        <div className='price_data'>{productsBucket.reduce((acc, element) => {
                            return acc + element.price;
                        }, 0)} UAH
                        </div>
                    </div>

                    <button className='create_order' onClick={() => moveToOrderPage()}>
                        Create order
                    </button>
                    <button className='continue_buying'
                            onClick={() => dispatch(productActions.setShowBucketModalWindow())}>
                        Сontinue buying
                    </button>
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
    width: 30%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 5;

    .header {
      width: 100%;
      display: flex;
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

    .price_container {
      margin-top: 3vh;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .price_title {
        font-size: 3vh;
        font-weight: bold;
      }

      .price_data {
        font-size: 3vh;
        font-weight: bold;
      }
    }

    .create_order {
      margin-top: 3vh;
      width: 100%;
      height: 8vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vh;
      font-weight: bold;
      color: #FFF;
      background-color: #000000;
      cursor: pointer;


      &:hover {
        background-color: #343434;
      }
    }

    .continue_buying {
      margin-top: 3vh;
      width: 100%;
      height: 8vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3vh;
      font-weight: bold;
      background-color: #FFF;
      color: #c2bfbf;
      cursor: pointer;


      &:hover {
        border: solid #000000;
      }
    }

    .container {
      width: 100%;
      height: 50vh;
      overflow: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0.5vw;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #000000;
      }

      .box {
        display: flex;
        width: 100%;
        flex-direction: column;

        hr {
          width: 100%;
        }

        .product_box {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .product_photo_box {
            width: 20%;
            display: flex;

            .photo {
              width: 100%;
              height: 15vh;
            }

          }

          .product_details_box {
            width: 78%;

            .code_container {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .code {

              }

              .delete_button {
                cursor: pointer;
                color: #c2bfbf;
                transition: 0.3s;
                font-size: 3vh;

                &:hover {
                  color: #000000;
                }
              }
            }
          }

          .product_title {
            width: 100%;
            font-size: 3vh;
            text-decoration: none;
            color: #000000;

          }

          .update_container {
            margin-top: 2vh;
            width: 100%;
            display: flex;
            justify-content: space-between;

            .product_price {
              font-weight: bold;
            }

            .update_box {
              width: 5vw;
              border: 0.1vh solid #c2bfbf;
              font-size: 3vh;
              font-weight: bold;
              display: flex;
              justify-content: space-between;

              .update_button {
                color: #c2bfbf;
                cursor: pointer;

                &:hover {
                  color: #000000;
                }
              }

            }
          }

          .details_container {
            margin-top: 1vh;
            width: 100%;
            display: flex;
            color: #c2bfbf;

            & > div > .details_data {
              color: #000000;
            }

            & > div:not(:first-child) {
              margin-left: 1vw;
            }
          }

        }
      }
    }

  }
`

export {BucketModalWindow};
