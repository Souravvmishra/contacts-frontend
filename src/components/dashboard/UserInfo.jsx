import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuth } from '../../HOC/checkAuth';


const UserInfo = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [user, setUser] = useState({})

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
        fetch('https://contacts-backend-yqhp.onrender.com/api/users/current', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                // 'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setUser(data)
                console.log(data);
            })
            .catch(error => {

                console.error(error);
            });

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({
                name,
                email,
                phone,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    console.log(data);
                    notify(data.message)
                    return
                }
                notify(`${data.name} added successfully`);
                setName('');
                setEmail('');
                setPhone('');
                console.log(data);

            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsSubmitting(false));
    };



    return (
        <div className=''>
            <div className='text-2xl px-12'>Email : {user.email}</div>
            <div className='text-2xl px-12 pb-4'>Password : {user.username}</div>

            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">


                    <h2 className='text-3xl md:text-4xl md:font-semibold pb-14 font-medium 
                    underline'>Add New Contact : </h2>

                    <form onSubmit={handleSubmit} >

                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Name
                            </label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
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
                                value={email}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@domain.com"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="phone"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Phone Number
                            </label>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Enter your subject"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>

                        <div>
                            <input
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                                type='submit'
                                value='Add Contact'
                            />


                        </div>
                    </form>
                </div>
            </div>



            <Link to="/contacts" className='underline decoration-dashed hover:text-xl duration-150'>View All Contacts</Link>
            <ToastContainer />


        </div>
    )
}

export default checkAuth(UserInfo)
