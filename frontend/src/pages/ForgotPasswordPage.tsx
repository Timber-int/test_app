import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import styled from "styled-components";
import {joiResolver} from "@hookform/resolvers/joi";
import {forgotPasswordDataValidator} from "../validation";
import {NavLink, useNavigate} from 'react-router-dom';
import {IForgotPassword} from '../interfaces';
import {useAppDispatch} from "../hooks";
import {GiMoneyStack} from "react-icons/gi";
import {BsBoxSeam} from "react-icons/bs";
import {HiOutlineCreditCard} from "react-icons/hi";
import {forgotPassword} from "../store/slices";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IForgotPassword>({
        resolver: joiResolver(forgotPasswordDataValidator),
        mode: 'onTouched',
    });

    const submit: SubmitHandler<IForgotPassword> = async (data: IForgotPassword) => {
        await dispatch(forgotPassword(data));
        await navigate('/auth/forgotPasswordSet', {replace: true});
        reset();
    }

    return (
        <Container>
            <div className='first_block'>
                <div className='registration'>Forgot password email confirm</div>
                <form onSubmit={handleSubmit(submit)} className='form_container'>
                    <div className='input_box'>
                        <div className='errors_container'>
                            {errors.email
                                &&
                                <span>
                            {errors.email.message}
                        </span>
                            }
                        </div>
                        <input className='form_input'
                               type="text" {...register('email')}
                               required
                               placeholder={'Email'}
                        />
                    </div>
                    <div className='account_question'>
                        <NavLink to={'/auth'}>I already have a account</NavLink>
                    </div>

                    <div className='submit_container'>
                        <input className='submit_input' type="submit" value={'Confirm'}/>
                    </div>
                </form>
            </div>

            <div className='second_block'>
                <div className='element_container'>
                    <div className='title'>
                        Bonus program estro
                    </div>
                    <div>
                        <span><GiMoneyStack/></span>
                        <span className='text'>
                            <span className='text_data'>Rewards</span>
                        </span>
                    </div>
                    <div>
                        <span><BsBoxSeam/></span>
                        <span className='text'><span className='text_data'>Surprises! At Estro,
                        </span> we love to give gifts, so with us you'll get birthday bonuses</span>
                    </div>
                    <div>
                        <span><HiOutlineCreditCard/></span>
                        <span className='text'><span className='text_data'>Personal promotions and closed sales!
                        </span> You will have the opportunity to take advantage of special discounts and personal offers</span>
                    </div>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;

  .first_block {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .second_block {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .element_container {
      width: 80%;
      display: flex;
      flex-wrap: wrap;

      & > div {
        width: 100%;
        margin-top: 3vh;

        .text {
          color: #857b7b;
          margin-left: 1vw;

          .text_data {
            color: #000000;
          }
        }

        .main_text {
          font-weight: bold;
        }
      }

      .title {
        font-size: 3.5vh;
        font-weight: bold;
      }
    }
  }

  .registration {
    width: 80%;
    font-weight: bold;
    text-transform: uppercase;
  }

  .form_container {
    width: 80%;
    display: flex;
    flex-wrap: wrap;

    .input_box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .errors_container {
        width: 100%;
        display: flex;
        height: 3vh;
      }

      .form_input {
        width: 100%;
        display: flex;
        height: 3.5vh;
        padding: 1.5vh;
      }

    }

    .submit_container {
      width: 100%;
      margin-top: 3vh;

      .submit_input {
        width: 100%;
        display: flex;
        height: 7.5vh;
        padding: 1.5vh;
        background-color: #000000;
        color: white;
        justify-content: center;
        align-items: center;
        font-size: 2.5vh;
        cursor: pointer;
        border: none;

        &:hover {
          background-color: #343434;
        }
      }
    }

    .account_question {
      margin-top: 1vh;
      width: 100%;
      display: flex;
      justify-content: flex-end;

      & > a {
        color: #000000;
        text-decoration: none;
      }

      & > a:hover {
        color: #343434;
        text-decoration: underline;
      }
    }
  }
`;

export {ForgotPasswordPage};
