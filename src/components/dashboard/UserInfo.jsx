import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { notify } from "../../utility/notify"
import AllContacts from "../dashboard/AllContacts";
import  Loader  from "../loader/Loader";
import Modal from './Modal';


const UserInfo = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contacts, setContacts] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("accessToken"))

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/api/contacts`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setContacts(data.sort((a, b) => a.name.localeCompare(b.name)));
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }, [token]);



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/users/current`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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
                // console.log(data);
            })
            .catch(error => {

                console.error(error);
            });

    }, [token])


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
                Authorization: `Bearer ${token}`,
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
                setContacts((contacts) => [...contacts, data])
                setName('');
                setEmail('');
                setPhone('');

            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                handleModalClose()
                setIsSubmitting(false)
            });
    };



    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const logOut = () => {
        localStorage.clear()
        setToken(null)
        navigate("/")
    }

    if (!user || !contacts ) {
        return (
            <div>
                <h1 className='text-2xl flex justify-center h-screen items-center font-semibold'>
                    <Loader />

                </h1>
            </div>
        )
        
    }



    return (
        <div className={`p-8 ${isModalOpen} ? opacity-50 : ' `}>
            <div className="flex justify-evenly space-x-2 mb-8 mx-14 ">
                <h2 className="text-3xl font-bold ">Welcome, { }{user.email}!</h2>

                <button
                    className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-300"
                    onClick={handleModalOpen}
                >
                    Add Contact
                </button>
                <button
                    className="bg-purple-500/50 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-300"
                    onClick={logOut}
                >
                    Log Out
                </button>
            </div>
            <div className="bg-white overflow-auto rounded-lg shadow-lg p-8">
                < AllContacts contacts={contacts} setContacts={setContacts} />

                {/* Render contacts here */}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <Modal handleSubmit = {handleSubmit} setName = {setName} setEmail= {setEmail} setPhone = {setPhone}  />
            )}
            <ToastContainer />
        </div>
    );
}

export default UserInfo
