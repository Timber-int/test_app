import React from 'react';
import styled from "styled-components";
import {baseURL} from '../config';
import {IProductResponse} from "../interfaces";

interface IProductProps {
    product: IProductResponse;
}

const Product = ({product}: IProductProps) => {
    const {
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

    return (
        <Container>
            <div className='photo_container'><img className='photo' src={baseURL + '/' + photo} alt={title}/></div>
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

        </Container>
    );
};

export const Container = styled.div`
  width: 30%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid black;
  margin: 1vh;

  .photo_container {

    .photo {
      width: 100%;
      height: 60vh;
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
`;
export {Product};
