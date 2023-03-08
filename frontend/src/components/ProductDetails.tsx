import React, {useCallback, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from "../hooks";
import {getAllProductPhotos, getAllProductSizes, getProductInformationByProductId} from "../store/slices";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {baseURL} from "../config";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {IProductResponse} from "../interfaces";
import {productActions} from "../store/slices/productSlice";
import {checkSelectedProductStyle} from './Product';
import {FaPencilRuler} from 'react-icons/fa';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ProductDetails = () => {

    const {state: product} = useLocation();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {user} = useAppSelector(state => state.authReducer);

    const {productSizes} = useAppSelector(state => state.productSizeReducer);

    const {productInformation} = useAppSelector(state => state.productInformationReducer);

    const {selectedProducts, chosenProductSize} = useAppSelector(state => state.productReducer);

    const {productPhotos} = useAppSelector(state => state.productPhotoReducer);

    const setProductDataToSelected = useCallback((e: React.FormEvent<EventTarget>, product: IProductResponse) => {
        e.preventDefault();
        if (!user) {
            navigate('/auth', {replace: true});
            return;
        }

        if (user.id) {
            dispatch(productActions.setProductDataToSelected({product, userId: user.id}));
        }
    }, [product, user]);

    useEffect(() => {
        dispatch(getAllProductSizes());
        dispatch(getAllProductPhotos());
        dispatch(getProductInformationByProductId(product.id));
    }, [product.id]);

    return (
        <Container>
            <div className='photos_container slider'>
                <ImageGallery autoPlay={false} showBullets={true} items={
                    [...productPhotos]
                        .filter(productPhoto => productPhoto.productId === product.id)
                        .map(productPhoto => Object.assign({}, {
                            original: baseURL + '/' + productPhoto.photo,
                            thumbnail: baseURL + '/' + productPhoto.photo,
                        }))
                }
                />
            </div>
            <div className='product_details_container'>
                <div className='title_container'>
                    <div className='title'>{product.title}</div>
                    <div className='selected_block' onClick={(e) => setProductDataToSelected(e, product)}>
                        {
                            checkSelectedProductStyle(selectedProducts, product.id)
                                ?
                                <AiFillHeart/>
                                :
                                <AiOutlineHeart/>
                        }
                    </div>
                </div>
                <div>

                </div>
                <div className='sizes_container'>
                    <div>Sizes:</div>
                    <div className='set_size' onClick={() => dispatch(productActions.setShowModalWindow())}>
                        <FaPencilRuler/> <span className='size_text'>Chose size</span>
                    </div>
                </div>
                <div className='sizes_container_main'>
                    {
                        productSizes
                            .filter(productSize => productSize.productId === product.id)
                            .map(productSize => (
                                <div
                                    className={
                                        chosenProductSize
                                        &&
                                        chosenProductSize.id === productSize.id ? 'product_size_selected' : 'product_size'}
                                    key={productSize.id}
                                    onClick={() => dispatch(productActions.setChosenProductSize({chosenProductSize: productSize}))}>
                                    {productSize.productSize}
                                </div>
                            ))
                    }
                </div>
                <div className='price_container'>
                    {
                        product.hasDiscount
                            ?
                            <div className='product_price_discount_container'>
                                <div className='price'>{product.price} UAH</div>
                                <div className='price_before_discount'>{product.priceBeforeDiscount} UAH</div>
                            </div>
                            :
                            <div className='product_price_container'>{product.price}</div>
                    }
                </div>
                <div className={chosenProductSize ? 'add_to_basket_button' : 'add_to_basket_button_disabled'}>
                    Add to basket
                </div>
                <div className='accordion_container'>
                    {
                        productInformation
                            ?
                            <Accordion className='element'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography className='title'>Information about product</Typography>
                                </AccordionSummary>
                                <AccordionDetails className={'block'}>
                                    <Typography className={'content_information'}>
                                        <div className='information_container'>
                                            <div className='information_box'>
                                                <div className='title_element'>Additional</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.additional}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Collection</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.collection}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Color</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.color}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Color or shade</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.colorOrShade}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>color range</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.colorRange}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Heels</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.heels}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Inside</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.inside}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Production</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.production}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Season</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.season}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Inside</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.inside}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Top material</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.topMaterial}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Type of heels</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.typeOfHeels}</span>
                                                </div>
                                            </div>
                                            <div className='information_box'>
                                                <div className='title_element'>Type of shoes</div>
                                                <div className='title_data'>
                                                    <span>{productInformation.typeOfShoes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            :
                            <></>
                    }
                    <Accordion className='element'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='title'>Delivery</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='block'>
                            <Typography className='content_text'>
                                <div>
                                    <span>Delivery of goods from the EU</span> is carried out free of charge within
                                    14
                                    days to the
                                    specified address by the Myst Express courier
                                </div>
                                <div>
                                    <span>Goods are delivered across Ukraine</span> by a Nova Poshta courier to the
                                    specified
                                    address or a Nova Poshta branch. When paying online - delivery of orders is free
                                </div>
                                <div>
                                    <span>Goods worth up to 1,000 hryvnias are delivered after payment on the website.</span>
                                </div>
                                <div>
                                    <span>The delivery service of adjacent sizes is valid only for goods from Ukraine.</span> The
                                    goods will be sent to you in separate parcels with the possibility of
                                    inspection,
                                    fitting and selection.
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='element'>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className='title'>Warranty and return</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={'block'}>
                            <Typography className={'content_text'}>
                                <div>
                                    <span>New goods are subject</span> to return at the Nova Poshta branch during the
                                    inspection or <span>after 14 days from the moment of purchase, provided there are no signs
                                    of wear.</span>
                                </div>
                                <div>
                                    Socks, tights, gloves, shoe care products in aerosol packaging are non-exchangeable
                                    and non-returnable products.
                                </div>

                                <div>
                                    <span>The warranty period for Estro products is 30 days, calculated from the day of sale</span> or
                                    from the beginning of the season (for seasonal products). Complaints and
                                    applications for warranty obligations are accepted in accordance with the Law of
                                    Ukraine "On the Protection of Consumer Rights".
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  //flex-wrap: wrap;
  justify-content: space-between;

  .photos_container {
    width: 50%;
  }

  .image-gallery-icon {
    color: #000000;

  }

  .image-gallery-icon:hover {
    color: #FFFFFF;
  }

  .image-gallery-icon:focus {
    color: #FFFFFF;
  }


  .product_details_container {
    width: 40%;
    display: flex;
    flex-direction: column;

    .title_container {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 5vh;
      }

      .selected_block {
        color: #cb2626;
        cursor: pointer;
        display: flex;
        font-size: 5vh;
      }
    }

    .sizes_container {
      margin-top: 5vh;
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 3vh;

      .set_size {
        cursor: pointer;

        &:hover .size_text {
          color: #000000;
        }

        .size_text {
          color: #857b7b;
        }
      }
    }

    .sizes_container_main {
      margin-top: 3vh;
      width: 100%;
      display: flex;

      .product_size:not(:first-child), .product_size_selected:not(:first-child) {
        margin-left: 0.5vh;
      }

      .product_size {
        width: 5vh;
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #d5d2d2;
        cursor: pointer;

        &:hover {
          border: 1px solid #000000;
        }
      }

      .product_size_selected {
        width: 5vh;
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #000000;
        cursor: pointer;
      }
    }

    .price_container {
      width: 100%;

      .product_price_discount_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 3vh;

        .price {
          width: 100%;
          text-decoration: line-through;
        }

        .price_before_discount {
          width: 100%;
          color: #cb2626;
          font-size: 4vh;
          font-weight: bold;
        }
      }

      .product_price_container {
        width: 100%;
        font-size: 3vh;
      }
    }

    .add_to_basket_button {
      margin-top: 3vh;
      width: 100%;
      height: 8vh;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000000;
      color: #FFF;
      font-weight: bold;
      font-size: 3vh;

      &:hover {
        background-color: #343434;
      }
    }

    .add_to_basket_button_disabled {
      margin-top: 3vh;
      width: 100%;
      height: 8vh;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #857b7b;
      font-weight: bold;
      font-size: 3vh;
      color: #FFF;
    }

    .accordion_container {
      width: 100%;
      margin-top: 3vh;

      .element {
        .title {
          font-weight: bold;
        }

        .block {
          .content_text > div:not(:first-child) {
            margin-top: 1vh;

            & > span {
              font-weight: bold;
            }

          }

          .content_information {
            width: 100%;

            .information_box {
              width: 100%;
              display: flex;
              flex-wrap: wrap;

              .title_element {
                width: 30%;
                color: #857b7b;
              }

              .title_data {
                width: 70%;

                & > span {
                  color: #000000;
                  text-transform: capitalize;
                }
              }
            }

          }
        }
      }
    }
  }
`

export {ProductDetails};
