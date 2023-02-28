import React from 'react';
import styled from "styled-components";

import { NavLink, Outlet } from 'react-router-dom';

const AuthPage = () => {
    return (
        <Container>
            <div className='authorization_container'>
                <Outlet/>
            </div>
            <div className='advertising_container'>
                <div>
                    <NavLink to={'/auth'}>sdfkjsjkf</NavLink>
                </div>
            </div>
        </Container>
    );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .authorization_container {
    width: 50%;
    display: flex;
    justify-content: center;
    //background-color: aquamarine;
    //align-items: center;
  }

  .advertising_container {
    width: 50%;
    display: flex;
    justify-content: center;
    //align-items: center;
  }
`;
export {AuthPage};
