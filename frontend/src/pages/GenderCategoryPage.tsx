import React, {useEffect} from 'react';
import styled from "styled-components";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {categoryActions, genderCategoryActions, getAllCategory, getAllGenderCategory} from "../store/slices";
import {IGenderCategoryResponse, IGenderResponse} from "../interfaces";
import {ICategoryResponse} from '../interfaces';

export interface IMoveToProductsData {
    genderCategory?: IGenderCategoryResponse,
    category?: ICategoryResponse,
    gender:IGenderResponse,
}

const GenderCategoryPage = () => {

    const {state: gender} = useLocation();

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {genderCategory} = useAppSelector(state => state.genderCategoryReducer);

    const {category} = useAppSelector(state => state.categoryReducer);

    useEffect(() => {
        dispatch(getAllGenderCategory(gender.id));
        dispatch(getAllCategory());
    }, [gender.id]);

    const moveToProducts = (id: number, data: IMoveToProductsData): void => {
        dispatch(categoryActions.setChosenCategoryNull());
        dispatch(genderCategoryActions.setChosenGenderCategoryNull());
        if (data.category) {
            dispatch(categoryActions.setChosenCategory({category: data.category}));
        }
        if (data.genderCategory){
            dispatch(genderCategoryActions.setChosenGenderCategory({genderCategory: data.genderCategory}));
        }

        navigate('/products/' + gender.id, {state: data, replace: true});
    }

    return (
        <Container>
            {
                genderCategory.map((genderCategory: IGenderCategoryResponse) =>
                    (
                        <div key={genderCategory.id} className='gender_category_container'>
                            <div className='gender_category_box'>
                                <div className='gender_category'>
                        <span className='title'
                              onClick={() => moveToProducts(genderCategory.id, {genderCategory,gender})}>
                            {genderCategory.title}
                        </span>
                                </div>
                            </div>
                            <div className='category_box'>
                                {
                                    category.filter(category => category.genderCategoryId === genderCategory.id).map((category: ICategoryResponse) => (
                                        <div
                                            className='title'
                                            key={category.id}
                                            onClick={() => moveToProducts(genderCategory.id, {
                                                genderCategory,
                                                category,
                                                gender
                                            })}
                                        >
                                            {category.title}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                )
            }
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 3vh;

  .gender_category_container {
    display: flex;
    flex-wrap: wrap;
    width: 20%;

    .gender_category_box {
      width: 100%;

      .gender_category {
        color: #000000;
        text-decoration: none;
        text-transform: capitalize;
        font-weight: bold;
      }

      .gender_category:hover {
        color: #cb2626;
      }
    }

    .category_box {
      display: flex;
      flex-direction: column;
      min-height: 20vh;
      height: 20vh;

      .title {
        width: 100%;
        margin: 1.5vh 0 0 0;
        text-transform: capitalize;
        text-decoration: none;
        color: #857b7b;
        cursor: pointer;
      }

      .title:hover {
        color: #cb2626;
      }
    }
  }

`;

export {GenderCategoryPage};
