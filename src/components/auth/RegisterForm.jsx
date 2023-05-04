import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { notify } from "../../utility/notify";




const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState(null)

    const navigate = useNavigate()


    function handleSubmit(event) {
        event.preventDefault();
        

        fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json()
            })
            .then(data => {
                console.log(data);
                if (data.message) {
                    console.log(data);
                    notify(data.message)
                    return
                }
                navigate('/login', { state: { "response": data } });

            })
            .catch((error) => {
                console.log(error);
                    notify('Something went wrong. Please try again later.');
                
            });
    }




    return (
        <div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">


                    <h2 className='text-3xl md:text-4xl md:font-semibold pb-14 font-medium 
                    underline'>Register Yourself Here!</h2>




                    <form onSubmit={handleSubmit} >
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Full Name
                            </label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
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

export default RegisterForm
