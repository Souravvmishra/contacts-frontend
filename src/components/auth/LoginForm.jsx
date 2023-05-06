import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { notify } from "../../utility/notify";
import { isTokenValid } from '../../HOC/checkAuth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()



    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            notify('Please enter email and password')
            return
        }

        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken);
                console.log(data.accessToken);
                navigate('/');
                return null
            })
            .catch(error => {
                notify('Invalid credentials');
            })
            .finally(() => setLoading(false));
    }


    const { state } = useLocation();
    const response = state && state.response;



    useEffect(() => {
        response && notify(`${response.email} Registered Successfully`);
        if (isTokenValid(localStorage.getItem("accessToken"))) {
            navigate('/');
        }
    })




    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8">Welcome Back!</h2>
                <form onClick={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block font-semibold mb-2">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-semibold mb-2">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-500">Don't have an account?</span>{' '}
                    <Link
                        to="/register"
                        className="text-purple-500 font-semibold hover:underline transition-colors duration-300"
                    >
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default (LoginForm)