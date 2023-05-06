import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-8">Create an Account</h2>
                <form>
                    <div className="mb-6">
                        <label htmlFor="name" className="block font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
                            placeholder="Enter your name"
                        />
                    </div>
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
                            onChange={(e) => setPassword(e.target.value)}
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
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-500">Already have an account?</span>{' '}
                    <Link
                        to="/login"
                        className="text-purple-500 font-semibold hover:underline transition-colors duration-300"
                    >
                        Login here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
