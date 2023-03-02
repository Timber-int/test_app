import React, {useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../hooks";
import {categoryActions, genderCategoryActions, getAllCategory, getAllGenderCategory} from "../store/slices";
import {getAllProducts} from "../store/slices/productSlice";
import {Pagination, Products} from "../components";
import {ICategoryResponse, IGenderCategoryResponse, IGenderResponse} from "../interfaces";
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'

const setTitle = (gender: IGenderResponse, chosenCategory: ICategoryResponse | null, genderCategory: IGenderResponse | null): string => {
    if (chosenCategory) {
        return chosenCategory.title;
    } else if (genderCategory) {
        return genderCategory.title;
    } else {
        return gender.title;
    }
}

const ProductsByGenderCategoryPage = () => {

    const {state: data} = useLocation();

    const {gender, genderCategory} = data;

    const dispatch = useAppDispatch();

    const {category, chosenCategory, categoryId} = useAppSelector(state => state.categoryReducer);

    const {
        chosenGenderCategory,
        genderCategory: genderCategoryArray,
        genderCategoryId,
    } = useAppSelector(state => state.genderCategoryReducer);

    const {products, page, perPage, itemCount} = useAppSelector(state => state.productReducer);

    useEffect(() => {
        dispatch(getAllCategory());

        if (gender && !genderCategory) {
            dispatch(getAllGenderCategory(gender.id));
        }
        if (categoryId) {
            dispatch(getAllProducts({
                genderId: gender.id,
                genderCategoryId: genderCategory.id,
                categoryId,
                page,
                perPage,
                title: ''
            }));
        }
        if (chosenGenderCategory) {
            dispatch(getAllProducts({
                genderId: gender.id,
                genderCategoryId: genderCategory.id,
                page,
                perPage,
                title: ''
            }));

        } else {
            dispatch(getAllProducts({genderId: gender.id, page, perPage, title: ''}));
        }
    }, [gender, genderCategoryId, categoryId, page]);

    const setChosenGenderCategory = (genderCategory: IGenderCategoryResponse): void => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    }

    const setChosenCategory = (genderCategory: IGenderCategoryResponse, category: ICategoryResponse): void => {
        console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    }

    return (
        <Container>
            <div className='menu'>
                {
                    !chosenGenderCategory
                        ?
                        <div className='gender_category_menu'>
                            <div className='back_to_menu_box'>
                                <NavLink className='gender_title' to={'/menu'}>
                                    <HiOutlineArrowNarrowLeft/> {gender.title}</NavLink>
                            </div>
                            {
                                genderCategoryArray.map((genderCategory: IGenderCategoryResponse) => (
                                    <div className='gender_category_container' key={genderCategory.id}>
                                        <span className='gender_category_title'
                                              onClick={() => setChosenGenderCategory(genderCategory)}>
                                            {genderCategory.title}
                                        </span>
                                        <div className='category_container'>
                                            {
                                                category.filter(category => category.genderCategoryId === genderCategory.id)
                                                    .map(category => (
                                                        <div className='category_title_box' key={category.id}>
                                                                <span
                                                                    className='category_title'
                                                                    onClick={() => setChosenCategory(genderCategory, category)}>
                                                                        {category.title}
                                                                </span>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :

                        <div className='menu_container'>
                            <div className='back_to_menu_box'>
                                <NavLink className='gender_title' to={'/menu'}>
                                    <HiOutlineArrowNarrowLeft/> {gender.title}</NavLink>
                            </div>
                            <span className='gender_category_title'
                                  onClick={() => dispatch(categoryActions.setChosenCategoryNull())}
                            >
                                    {genderCategory.title}
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
                }
            </div>
            <div className='products_container'>
                <Products products={products} title={setTitle(gender, chosenCategory, chosenGenderCategory)}/>
                <div className='pagination_container'>
                    <Pagination page={page} perPage={perPage} itemCount={itemCount}/>
                </div>
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

      .back_to_menu_box {
        width: 100%;

        .gender_title {
          color: #857b7b;
          text-decoration: none;
          text-transform: capitalize;

          &:hover {
            color: #000000;
          }
        }
      }

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

    .gender_category_menu {

      .back_to_menu_box {
        width: 100%;

        .gender_title {
          color: #857b7b;
          text-decoration: none;
          text-transform: capitalize;

          &:hover {
            color: #000000;
          }
        }
      }

      .gender_category_container {
        display: flex;
        flex-wrap: wrap;

        .gender_category_title {
          width: 100%;
          text-transform: capitalize;
          color: #000000;
        }

        .category_container {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .category_title_box {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-left: 2vh;

            .category_title {
              color: #857b7b;
              text-transform: capitalize;
            }
          }

        }
      }
    }


  }

  .products_container {
    width: 75%;
    display: flex;
    flex-wrap: wrap;

    .pagination_container {
      width: 100%;
    }
  }
`;

export {ProductsByGenderCategoryPage};
