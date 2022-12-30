import React, {useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dishesActions, getAllDishes} from "../../store";
import {CONSTANTS} from "../../constants";
import {CreatedData, Loading, ModalWindow} from "../../components";
import {baseURL} from "../../config";
import ReactPaginate from "react-paginate";
import {useForm} from "react-hook-form";
import css from './CategoryDishesPage.module.css';

const CategoryDishesPage = () => {

    const {state: category} = useLocation();

    const dispatch = useDispatch();

    const {
        dishes,
        serverErrors,
        status,
        perPage,
        itemCount,
        page,
        theme,
        visible,
        searchData,
    } = useSelector(state => state.dishesReducer)

    const choosePage = (data) => {
        dispatch(dishesActions.setPage({pageNumber: data.selected + 1}));
    }

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const submit = (data) => {
        dispatch(dishesActions.setSearchData({searchData: data.name}));
        reset();
    }

    useEffect(() => {
        if (category) {
            dispatch(getAllDishes({categoryId: category.id, page, perPage: 10, name: searchData}));
        }
    }, [category.id, page, searchData]);

    return (
        <>
            {
                serverErrors && <div className={css.server_error}>{serverErrors}</div>
            }
            {
                status === CONSTANTS.LOADING
                    ?
                    <Loading/>
                    :
                    dishes.length
                        ?
                        <div className={css.content_container}>
                            {
                                visible
                                    ?
                                    <ModalWindow/>
                                    :
                                    <>
                                        <form onSubmit={handleSubmit(submit)} className={css.search_dish_container}>
                                            <input className={theme === true ? css.search_input_dark : css.search_input}
                                                   {...register('name')}
                                                   type="text"
                                                   placeholder={'Search...'}
                                            />
                                            <input
                                                className={theme === true ? css.confirm_input_dark : css.confirm_input}
                                                type="submit"
                                                value={dishes.length === 0 ? 'Get dishes' : 'Search'}/>
                                        </form>
                                        <div className={css.dishes_container}>
                                            {
                                                dishes && dishes.map(dish => (
                                                    <div key={dish.id} className={css.dish_box}>
                                                        <NavLink to={'/'}>
                                                            <img className={css.dish_image}
                                                                 src={baseURL + '/' + dish.photo}
                                                                 alt={dish.name}/>
                                                        </NavLink>
                                                        <div className={css.dish_name}>{dish.name}</div>
                                                        <div className={css.dish_information}>
                                                            <div>Calories: {dish.calories}</div>
                                                            <div>Data: <CreatedData createdAt={dish.createdAt}/></div>
                                                        </div>
                                                        <div className={css.get_recipe}
                                                             onClick={() => dispatch(dishesActions.setShowWindow({chosenDish: dish}))}>
                                                            Get recipe...
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                            }
                            <div className={css.pagination_container}>
                                {
                                    itemCount <= 10
                                    ||
                                    perPage <= 1
                                        ?
                                        <></>
                                        :
                                        <ReactPaginate
                                            breakLabel='...'
                                            pageCount={Math.ceil(itemCount / perPage)}
                                            onPageChange={(data) => choosePage(data)}
                                            forcePage={page === 1 ? 0 : page - 1}
                                            containerClassName={theme === true ? css.pagination_container_dark : css.pagination_container}
                                            disabledClassName={theme === true ? css.pagination_disabled_dark : css.pagination_disabled}
                                            activeClassName={theme === true ? css.pagination_active_dark : css.pagination_active}
                                        />
                                }
                            </div>
                        </div>
                        :
                        <div>
                            Empty Dishes is empty for this {category?.name} category
                        </div>
            }
        </>
    );
};

export {CategoryDishesPage};
