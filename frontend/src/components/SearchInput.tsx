import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {SubmitHandler, useForm} from "react-hook-form";
import {productActions} from '../store/slices/productSlice';
import styled from "styled-components";
import {TbSearch} from "react-icons/tb";

interface ISearchData {
    searchData: string
}

const SearchInput = () => {

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
    } = useForm<{ searchData: string }>();

    const submit: SubmitHandler<ISearchData> = (data: ISearchData) => {
        dispatch(productActions.setSearchData({searchData: data.searchData}));
    }

    return (
        <Container onSubmit={handleSubmit(submit)}>
            <button className='search_button'><TbSearch/></button>
            <input className='search_input' type="search" {...register('searchData')} placeholder='Search...'/>
        </Container>
    );
};

const Container = styled.form`
  width: 100%;

  .search_button {
    font-size: 3vh;
    background: none;
    border: none;
    color: #000000;
    cursor: pointer;
    width: 5%;
  }

  .search_input {
    font-size: 3vh;
    width: 95%;
    border: none;
    background: none;
    outline: none;

    &::-webkit-search-cancel-button {
      cursor: pointer;
    
    }
  }
`

export {SearchInput};
