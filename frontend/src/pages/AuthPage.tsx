import React from 'react';
import styled from "styled-components";

import {Outlet} from 'react-router-dom';

const AuthPage = () => {
    return (
        <Container>
            <Outlet/>
        </Container>
    );
};
const Container = styled.div`
  width: 100%;
  margin-top: 5vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export {AuthPage};
