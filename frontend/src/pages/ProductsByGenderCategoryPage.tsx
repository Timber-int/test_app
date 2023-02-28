import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../hooks";
import {categoryActions, getAllCategory} from "../store/slices";
import {getAllProducts} from "../store/slices/productSlice";
import {Products} from "../components";

const ProductsByGenderCategoryPage = () => {

    const {state: genderCategory} = useLocation();

    const dispatch = useAppDispatch();

    const {category, chosenCategory, categoryId} = useAppSelector(state => state.categoryReducer);

    const {products} = useAppSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(getAllCategory());
        if (categoryId) {
            dispatch(getAllProducts({genderCategoryId: genderCategory.id, categoryId}));
        } else {
            dispatch(getAllProducts({genderCategoryId: genderCategory.id}));
        }
    }, [genderCategory.id, categoryId]);

    return (
        <Container>
            <div className='menu'>
                <div className='menu_container'>
                    <span className='gender_category_title'
                          onClick={() => dispatch(categoryActions.setChosenCategoryNull())}>{genderCategory.title}
                    </span>
                    {
                        category.filter(category => category.genderCategoryId === genderCategory.id).map(category => (
                            <div className='category_title_box' key={category.id}>
                                <span
                                    className={categoryId === category.id ? 'category_title_selected' : 'category_title'}
                                    onClick={() => dispatch(categoryActions.setChosenCategory({category}))}>
                                    {category.title}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='products_container'>
                <Products products={products} title={categoryId ? chosenCategory?.title : genderCategory.title}/>
            </div>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .menu {
    width: 25%;

    .menu_container {

      .gender_category_title {
        text-transform: capitalize;
        text-decoration: none;
        color: #000000;

        &:hover {
          color: #cb2626;
        }
      }

      .category_title_box {

        .category_title {
          text-transform: capitalize;
          text-decoration: none;
          color: #857b7b;
          margin-left: 2vh;

          &:hover {
            color: #000000;
          }
        }

        .category_title_selected {
          text-transform: capitalize;
          text-decoration: none;
          color: #000000;
          margin-left: 2vh;
        }
      }

    }
  }

  .products_container {
    width: 75%;
    display: flex;
  }
`;

export {ProductsByGenderCategoryPage};
