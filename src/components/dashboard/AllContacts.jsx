import React, { useState } from 'react'
import { motion } from 'framer-motion';

import { notify } from "../../utility/notify"
import Modal from './Modal';

import { ToastContainer } from 'react-toastify';

const AllContacts = ({ contacts, setContacts }) => {

  const [id, setId] = useState("")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [updating, setUpdating] = useState(false)

  const handleDeleteContact = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`

        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);

          notify(`${data.email} deleted `)
          setContacts(contacts.filter(contact => contact._id !== id))
        })
    } catch (error) {
      console.error(error);
    }

  };

  const updateContact = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ name, email, phone}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        notify(errorData.message)
        throw new Error(errorData.message);
      }

      const updatedContact = await response.json();
      notify(`${updatedContact.email} Updated`)
      setContacts(contacts.filter(contact => contact._id !== id))
      setContacts((c) => [...c, updatedContact])
    } catch (error) {
      console.error(error)
      notify(error)
    } finally{setUpdating(false)}
  };


  const animations = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }

  }

  return (
    <motion.div
      initial={animations.initial}
      animate={animations.animate}
      exit={{ opacity: 0, y: -20 }}
      transition={animations.transition}
      className="">
      <h2 className="text-3xl font-bold mb-8">Contacts</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead className='text-left'>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b font-semibold text-sm text-gray-700">
                Name
              </th>
              <th className="py-2 px-4 bg-gray-100 border-b font-semibold text-sm text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 bg-gray-100 border-b font-semibold text-sm text-gray-700">
                Phone
              </th>
              <th className="py-2 px-4 bg-gray-100 border-b font-semibold text-sm text-gray-700 ">
                Actions
              </th>
              <th className="py-2 px-4 bg-gray-100 border-b font-semibold text-sm text-gray-700 ">
                Actions
              </th>

            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td className="py-2 px-4 border-b">{contact.name}</td>
                <td className="py-2 px-4 border-b">{contact.email}</td>
                <td className="py-2 px-4 border-b">{contact.phone}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-purple-500 font-semibold hover:underline mr-2"
                    onClick={ () => {
                      setUpdating(true) 
                      setId(contact._id)
                      setName(contact.name)                   
                      setEmail(contact.email)
                      setPhone(contact.phone)
                    }}
                  >
                    Update
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-red-500 font-semibold hover:underline"
                    onClick={() => handleDeleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      )}
      {updating && <Modal setName = {setName} setEmail = {setEmail} setPhone = {setPhone} handleSubmit = {updateContact} handleModalClose = {() => setUpdating(false)} name ={name} phone = {phone} email = {email} head = {"Update Contact"}/>}
      <ToastContainer />
    </motion.div>
  )
}

export default AllContacts
