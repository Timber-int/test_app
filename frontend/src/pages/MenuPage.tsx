import React, {useEffect} from 'react';
import styled from "styled-components";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {categoryActions, genderCategoryActions, getAllGenders} from "../store/slices";
import {IGenderResponse} from "../interfaces";
import {IMoveToProductsData} from './GenderCategoryPage';

const MenuPage = () => {

    const navigate = useNavigate();

    const {genders, serverErrors, status} = useAppSelector(state => state.genderReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllGenders());
    }, []);

    const moveToGenderCategory = (data: IMoveToProductsData) => {
        dispatch(categoryActions.setChosenCategoryNull());
        dispatch(genderCategoryActions.setChosenGenderCategoryNull());
        navigate('/menu/category/' + data.gender.id, {state: data.gender, replace: true});
    }

    const moveToProducts = (data: IMoveToProductsData) => {
        dispatch(categoryActions.setChosenCategoryNull());
        dispatch(genderCategoryActions.setChosenGenderCategoryNull());
        navigate('/products/' + data.gender.id, {state: data, replace: true});
    }

    return (
        <Container>
            <div className='menu'>
                <div className='genders_menu'>
                    {
                        genders.map(gender => (
                            <div
                                className='gender'
                                key={gender.id}
                                onClick={() => moveToProducts({gender})}
                                onMouseEnter={() => moveToGenderCategory({gender})}
                            >
                                {gender.title}
                            </div>
                        ))
                    }
                </div>
                <div className='category_menu'>
                    <Outlet/>
                </div>
            </div>
            <div className='commercials'>
            </div>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  display: flex;

  .menu {
    width: 65%;

    .genders_menu {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .gender {
        text-decoration: none;
        text-transform: capitalize;
        color: #000000;
        cursor: pointer;

        &:nth-child(2) {
          margin: 0 2vw 0 2vw;
        }

        &:hover {
          text-decoration: underline;
        }
      }

    }

    .category_menu {
      width: 100%;
    }
  }

  .commercials {
    width: 35%;
  }
`;

export {MenuPage};
