import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { setError, unsetError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui );

    let error = null;
    const [{name, email, password, password2}, handleInputChange] = useForm({
        name: 'Albert',
        email: 'albertchao@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const handleRegister = (e) => {
        e.preventDefault();
        if(isFormValid()) {
            dispatch( unsetError() );    
        } else {
            dispatch( setError(error) );
        }
        dispatch( startRegisterWithEmailPasswordName(email, password, name) );
    }

    const isFormValid = () => {
        if(name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || password2.trim().length === 0) {
            error = 'There is an empty string';
            return false;
        }
        if(!validator.isEmail(email)) {
            error = 'Email is not valid';
            return false;
        }
        if(password !== password2 || password.length < 5) {
            error = 'Password should be at least 6 characters or passwords not match';
            return false;
        }
        return true;
    }
    
    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={handleRegister}>
                {
                    msgError &&
                    <div className='auth__alert-error'>{msgError}</div>
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={email}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password2}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
