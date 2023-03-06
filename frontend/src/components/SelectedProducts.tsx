import React from 'react';
import {useAppSelector} from "../hooks";
import styled from "styled-components";
import {Product} from "./Product";
import {IProductResponse} from '../interfaces';

const SelectedProducts = () => {

    const {user} = useAppSelector(state => state.authReducer);

    const {selectedProducts} = useAppSelector(state => state.productReducer);

    return (
        <Container>
            {
                user && selectedProducts.filter(selectedProduct => selectedProduct.userId === user.id).map(selectedProduct => {
                    return (
                        <div key={selectedProduct.id} className='product_box'>
                            <Product product={selectedProduct as IProductResponse}/>
                        </div>
                    )
                })
            }
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .product_box {
    width: 24.4%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0.5vh;
    position: relative;
  }
`

export {SelectedProducts};
