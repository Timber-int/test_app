import React from 'react';
import styled from "styled-components";
import Logo from '../assets/logo.4094b43fa7 (1).svg';
import {NavLink, Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <InformationLines className='information_lines'>
                <p className='information_text'>Скай тягло псяче</p>
            </InformationLines>
            <Container>
                <div className='header'>
                    <div className='menu'>
                        <div className='block_first'>
                            <NavLink to={'/menu'}>
                                X
                            </NavLink>
                        </div>
                        <div className='block_second'>
                            <img className='logo' src={Logo} alt="logo"/>
                        </div>
                        <div className='block_third'>

                        </div>
                    </div>
                </div>
                <div className='content'>
                    <Outlet/>
                </div>
                <div className='footer'>

                </div>
            </Container>
        </>
    );
};
const InformationLines = styled.div`
  height: 4vh;
  width: 100vw;
  background-color: #000000;
  margin:0 auto;
  
  & .information_text{
    text-align:center;
    color:#fff;
    text-transform: uppercase;
    //padding-top: 35px;
    animation: text 20s infinite linear;
    padding-left: 100%;
    white-space: nowrap;
  }

  @keyframes text {
    0%{
      transform: translate(0, 0);
    }

    100%{
      transform: translate(-100%, 0);
    }
  }
  
`;
const Container = styled.div`
  padding: 0 10vh 0 10vh;

  .header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .menu {
      height: 10vh;
      width: 100%;
      display: flex;

      .block_first {
        width: 25%;
        display: flex;
        align-items: center;
      }

      .block_second {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .logo {
          width: 20%;
          height: 100%;
        }
      }

      .block_third {
        width: 25%;
      }
    }
  }

  .content {
    width: 100%;
    height: 60vh;
  }

  .footer {

  }
`

export {Layout};
