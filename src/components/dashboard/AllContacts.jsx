import React, { useState } from 'react'
import {notify} from "../../utility/notify"
import { ToastContainer } from 'react-toastify';

const AllContacts = ({ contacts, setContacts }) => {

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

  return (
    <div className="">
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
                  <button className="text-purple-500 font-semibold hover:underline mr-2">
                    Update
                  </button>
                </td>
                <td>

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
      <ToastContainer />
    </div>
  )
}

export default AllContacts
