import React, {useCallback, useEffect} from 'react';
import styled from "styled-components";
import {baseURL} from '../config';
import {IProductResponse, ISelectedProduct} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getAllProductPhotos, getAllProductSizes} from "../store/slices";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import {productActions} from "../store/slices/productSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';

const cookies = new Cookies();

const checkSelectedProductStyle = (selectedProducts: ISelectedProduct[], productId: number): boolean => {
    const selectedProduct = selectedProducts.find(selectedProduct => selectedProduct.id === productId);
    return !!selectedProduct;
}

interface IProductProps {
    product: IProductResponse;
}

const Product = ({product}: IProductProps) => {
    const {
        id,
        title,
        photo,
        price,
        count,
        hasDiscount,
        discount,
        selected,
        priceBeforeDiscount,
        categoryId,
        genderCategoryId
    } = product;

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {productSizes} = useAppSelector(state => state.productSizeReducer);

    const {user} = useAppSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(getAllProductSizes());
        dispatch(getAllProductPhotos());
    }, []);
    const {productPhotos} = useAppSelector(state => state.productPhotoReducer);

    const {selectedProducts} = useAppSelector(state => state.productReducer);

    const setProductDataToSelected = useCallback((product: IProductResponse) => {
        if (!user) {
            navigate('/auth', {replace: true});
            return;
        }

        if (user.id) {
            dispatch(productActions.setProductDataToSelected({product, userId: user.id}));
        }
    }, [product, user]);

    return (
        <Container>
            {/*<div className='photo_container'><img className='photo' src={baseURL + '/' + photo} alt={title}/></div>*/}
            <Carousel showThumbs={false} showIndicators={false} showStatus={false} >
                {
                    productPhotos.filter(productPhoto => productPhoto.productId === id)
                        .map(productPhoto => (
                            <div className='photo_container'>
                                <img className='photo' src={baseURL + '/' + productPhoto.photo}/>
                                {/*<p className="legend">Legend 1</p>*/}
                            </div>

                        ))
                }
            </Carousel>
            {
                product.discount > 0 && hasDiscount
                    ?
                    <div className='sale_container'>Sale -{product.discount}%</div>
                    :
                    <div className='sale_empty_container'>

                    </div>
            }
            {
                hasDiscount
                    ?
                    <div className='price_discount_container'>
                        <span className='price-before'>{priceBeforeDiscount} UAH</span>
                        <span className='price'>{price} UAH</span>
                    </div>
                    :
                    <div className='price_container'>
                        {price} UAH
                    </div>
            }
            <div className='title_container'><span className='title'>{title}</span></div>
            <div className='product_sizes_container'>
                <div className='product_sizes_box'>
                    <div className='size'>Sizes:</div>
                    <div className='product_sizes'>
                        {
                            productSizes.filter(productSize => productSize.productId === id).map(productSize => (
                                <div key={productSize.id}>{productSize.productSize}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='selected_block' onClick={() => setProductDataToSelected(product)}>
                {
                    checkSelectedProductStyle(selectedProducts, id)
                        ?
                        <AiFillHeart/>
                        :
                        <AiOutlineHeart/>
                }
            </div>
        </Container>
    );
};

export const Container = styled.div`

  .photo_container {
    width: 100%;
    cursor: pointer;

    .photo {
      width: 100%;
      height: 65vh;
    }
  }

  .sale_empty_container {
    width: 100%;
    height: 3.5vh;
  }

  .sale_container {
    width: 100%;
    color: #cb2626;
    height: 3.5vh;
  }

  .price_discount_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 3.5vh;

    & > span {
      width: 50%;
      display: flex;
    }

    .price-before {
      text-decoration: line-through;
    }

    .price {
      color: #cb2626;
    }
  }

  .price_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 3.5vh;
    justify-content: flex-start;
  }

  .title_container {
    width: 100%;

    .title {
      text-transform: capitalize;
      color: #000000;
    }
  }

  .product_sizes_container {
    width: 100%;
    height: 3vh;
    display: flex;

    .product_sizes_box {
      width: 100%;
      display: none;
      color: #857b7b;

      .size {
        width: 15%;
      }

      .product_sizes {
        display: flex;
        width: 85%;

        & > div {
          margin-left: 0.5vh;
        }
      }

    }
  }

  .selected_block {
    display: none;
  }

  &:hover .product_sizes_box {
    display: flex;

  }

  &:hover .selected_block {
    color: #cb2626;
    cursor: pointer;
    display: flex;
    position: absolute;
    top: 2vh;
    font-size: 3vh;
    right: 3vh;
  }

`;
export {Product};
