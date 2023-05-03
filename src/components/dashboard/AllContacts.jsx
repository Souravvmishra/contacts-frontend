import React, { useEffect, useState} from 'react'
import { checkAuth } from '../../HOC/checkAuth';

const AllContacts = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
      fetch('http://localhost:5001/api/contacts', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setContacts(data);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }, []);
    
  return (
    <div>
      <h1 className='font-semibold text-2xl'>All Contacts</h1>
      <div className='py-14 w-screen '>

      <table >
        <tbody>

      {contacts.map((contact) => {
        return (
          <tr key={contact.name+contact.phone}>
            <td className='px-4 border-b-2 text-xl'>{contact.name}</td>
            <td className='px-4 border-b-2 text-xl'>{contact.email}</td>
            <td className='px-4 border-b-2 text-xl'>{contact.phone}</td>
          </tr>
        )
      })}
        </tbody>

      </table>

      </div>

    </div>
  )
}

export default checkAuth(AllContacts)