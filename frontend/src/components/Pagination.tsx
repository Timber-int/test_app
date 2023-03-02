import React from 'react';
import ReactPaginate from "react-paginate";
import {useAppDispatch} from "../hooks";
import {productActions} from "../store/slices/productSlice";
import styled from "styled-components";

// import './Pagination.css';

interface IPaginationProps {
    page: number,
    perPage: number,
    itemCount: number
}

const Pagination = ({page, perPage, itemCount}: IPaginationProps) => {
    const dispatch = useAppDispatch();

    const choosePage = (data: { selected: number }) => {
        dispatch(productActions.setPage({pageNumber: data.selected + 1}));
    }

    return (
        <StyledPaginateContainer>
            <ReactPaginate
                breakLabel='...'
                pageCount={Math.ceil(itemCount / perPage)}
                onPageChange={(data: { selected: number }) => choosePage(data)}
                forcePage={page === 1 ? 0 : page - 1}
                containerClassName='pagination_container'
                disabledClassName='pagination_disabled'
                activeClassName='pagination_active'
                previousLinkClassName='previous'
                nextClassName='next'
                nextLabel="next >"
                previousLabel="< previous"
            />
        </StyledPaginateContainer>
    )
};

const StyledPaginateContainer = styled.div`
  .pagination_container {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 5vh;
    align-items: center;
    list-style: none;

    & a {
      margin: 10px;
      color: #857b7b;
      cursor: pointer;
      font-size: 3vh;

      &:hover {
        color: #000000;
      }
    }

    .pagination_active a {
      color: #000000;
    }

    .pagination_disabled a {
      cursor: auto;
      color: #bebaba;
    }
  }
`

export {Pagination};
