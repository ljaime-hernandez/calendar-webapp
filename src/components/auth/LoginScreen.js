import React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    // the values on this form are set by default so the user can check the functionality of the webapp without creating
    // their own user, but it can receive different information if requested
    const [values, handleInputChange, reset] = useForm({
        loginEmail: 'email@email.com',
        loginPassword: '122345'
    });

    // the values on this form are set empty so the user can create its account
    const [registerValues, handleRegisterInputChange, registerReset] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerConfirmPassword: ''
    });

    // the values of both the login and register forms are retrieved for use to use them as reference for any operation
    // we require in the future 
    const { loginEmail, loginPassword } = values;
    const { registerName, registerEmail, registerPassword, registerConfirmPassword } = registerValues;

    const handleLogin = (e) => {
        e.preventDefault();
        // dispatches the function using the first form to log the user in
        dispatch(startLogin( loginEmail, loginPassword ));
        reset();
    }

    const handleRegister = (e) => {
        e.preventDefault();

        // compares the registration password as they have to be equal, if not then the user wont be able
        // to submit the form, the calendar backend also has a secondary filter which will force the user to
        // submit a password of at least 6 characters, displayed in a sweetalert popup with the respective message
        if(registerPassword !== registerConfirmPassword){
            return Swal.fire('error', 'Password does not match with password confirmation', 'error');
        }

        // will register the users information if properly submitted onto out mongo database. If successful,
        // the user will also be logged in to the webpage
        dispatch(startRegister(registerName, registerEmail, registerPassword ));
        // Resets the values of the register form
        registerReset();
    }

    return (
        <div className='container mt-5 pt-5'>
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Access</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password should be at least 6 characters long"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm your password"
                                name="registerConfirmPassword"
                                value={registerConfirmPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}