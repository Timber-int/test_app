import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import styled from "styled-components";
import {joiResolver} from "@hookform/resolvers/joi";
import {registrationDataValidator} from "../validation";
import {NavLink, useNavigate} from 'react-router-dom';
import {IRegistration, IUser} from '../interfaces';
import {useDispatch} from "react-redux";
import {authActions, registration} from "../store/slices";
import {useAppDispatch} from "../hooks";

const RegistrationPage = () => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IRegistration>({
        resolver: joiResolver(registrationDataValidator),
        mode: 'onTouched',
    });

    const submit: SubmitHandler<IRegistration> = (data: IRegistration) => {
        dispatch(registration(data));
    }

    return (
        <Container>
            <div className='registration'>Registration</div>
            <form onSubmit={handleSubmit(submit)} className='form_container'>
                <div className='input_box'>
                    <div className='errors_container'>
                        {errors.firstName
                            &&
                            <span>
                            {errors.firstName.message}
                        </span>
                        }
                    </div>
                    <input className='form_input'
                           type="text" {...register('firstName')}
                           required
                           placeholder={'FirstName'}
                    />
                </div>

                <div className='input_box'>
                    <div className='errors_container'>
                        {errors.lastName
                            &&
                            <span>
                            {errors.lastName.message}
                        </span>
                        }
                    </div>
                    <input className='form_input'
                           type="text" {...register('lastName')}
                           required
                           placeholder={'LastName'}
                    />
                </div>

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

                <div className='input_box'>
                    <div className='errors_container'>
                        {errors.password
                            &&
                            <span>
                            {errors.password.message}
                        </span>
                        }
                    </div>
                    <input className='form_input'
                           type="text" {...register('password')}
                           required
                           placeholder={'Password'}
                    />
                </div>
                <div className='account_question'>
                    <NavLink to={'/auth'}>I already have a account</NavLink>
                </div>

                <div className='submit_container'>
                    <input className='submit_input' type="submit" value={'Registration'}/>
                </div>
            </form>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

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

export {RegistrationPage};
