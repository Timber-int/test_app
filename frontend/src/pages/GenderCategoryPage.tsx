import React, {useEffect} from 'react';
import styled from "styled-components";
import {NavLink, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getAllCategory, getAllGenderCategory} from "../store/slices";
import {IGenderCategoryResponse} from "../interfaces/genderCategoryInterface";
import {ICategoryResponse} from '../interfaces';

const GenderCategoryPage = () => {

    const {state: gender} = useLocation();

    const dispatch = useAppDispatch();

    const {genderCategory} = useAppSelector(state => state.genderCategoryReducer);

    const {category} = useAppSelector(state => state.categoryReducer);

    useEffect(() => {
        dispatch(getAllGenderCategory(gender.id));
        dispatch(getAllCategory());
    }, [gender.id]);

    return (
        <Container>
            {
                genderCategory.map((genderCategory: IGenderCategoryResponse) =>
                    (
                        <div key={genderCategory.id} className='gender_category_container'>
                            <div className='gender_category_box'>
                                <NavLink
                                    className='gender_category'
                                    to={'/products/' + genderCategory.id}
                                >
                        <span className='title'>
                            {genderCategory.title}
                        </span>
                                </NavLink>
                            </div>
                            <div className='category_box'>
                                {
                                    category.filter(category => category.genderCategoryId === genderCategory.id).map((category: ICategoryResponse) => (
                                        <span className='title' key={category.id}>{category.title}</span>
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
