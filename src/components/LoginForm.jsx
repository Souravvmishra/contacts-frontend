import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    const { state } = useLocation();
    const response = state && state.response;


    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            notify('Please enter email and password')
            return
        }

        fetch('http://localhost:5001/api/users/login', {
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
                console.log(data);
                navigate('/userinfo');
            })
            .catch(error => {
                notify('Invalid credentials');
                console.error('Error:', error);
            });
    }


    const notify = (message) => toast(`${message} `, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });;

    
      

    useEffect(() => {
        response && notify(`${response.email} Registered Successfully` );

        if (localStorage.getItem("accessToken")) {
            navigate("./userinfo")
        }
        
    })



    return (
        <div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">


                    <h2 className='text-3xl md:text-4xl md:font-semibold pb-14 font-medium 
                    underline'>Login Yourself Here!</h2>

                    <form onSubmit={handleSubmit} >

                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email Address
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@domain.com"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="subject"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your subject"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>

                        <div>
                            <input
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                                type='submit'
                                value='Sign Up'
                            />


                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer />

        </div>
    )
}

export default LoginForm
