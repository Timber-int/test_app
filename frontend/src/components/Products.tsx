import React from 'react';
import {IProductResponse} from "../interfaces";
import styled from "styled-components";
import {Product} from "./Product";

interface IProductProps {
    products: IProductResponse[];
    title: string
}

const Products = ({products, title}: IProductProps) => {
    return (
        <Container>
            <div className='category_title_container'>
                <span className='title'>{title}</span>
            </div>
            <div className='sorting_container'>

            </div>
            <div className='products_container'>
                {
                    products.map(product => (
                            <div className='product_box' key={product.id}>
                                <Product product={product}/>
                            </div>
                        )
                    )
                }
            </div>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .category_title_container {
    width: 100%;

    .title {
      color: #000000;
      text-transform: capitalize;
    }
  }

  .sorting_container {
    width: 100%;
  }

  .products_container {
    margin-top: 5vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .product_box {
      width: 32%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0.5vh;
      position: relative;
    }
  }
`;

export {Products};
