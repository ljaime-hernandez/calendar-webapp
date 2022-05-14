import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const [values, handleInputChange, reset] = useForm({
        loginEmail: 'email@email.com',
        loginPassword: '122345'
    });

    const { loginEmail, loginPassword } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword));
        console.log(values);
    }

    return (
        <div>
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
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm your password" 
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