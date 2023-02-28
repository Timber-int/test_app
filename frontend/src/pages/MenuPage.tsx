import React, {useEffect} from 'react';
import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getAllGenders} from "../store/slices";

const MenuPage = () => {

    const {genders, serverErrors, status} = useAppSelector(state => state.genderReducer);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllGenders());
    }, []);

    return (
        <Container>
            <div className='menu'>
                <div className='genders_menu'>
                    {
                        genders.map(gender => (
                            <NavLink
                                className='gender'
                                key={gender.id}
                                to={'/menu/category/' + gender.id}
                                state={gender}
                            >
                                {gender.title}
                            </NavLink>
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

      & a[class='gender active'] {
        text-decoration: underline;
      }

      .gender {
        text-decoration: none;
        text-transform: capitalize;
        color: #000000;

        &:nth-child(2) {
          margin: 0 2vw 0 2vw;
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
