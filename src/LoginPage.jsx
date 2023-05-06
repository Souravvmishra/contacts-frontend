import React, { useState } from 'react';

const DashboardPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAddContact = (e) => {
        e.preventDefault();
        // Perform contact addition logic here
        console.log('Contact added:', { name, email, phone });
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        // Close the modal
        setIsModalOpen(false);
    };

   
};

export default DashboardPage;
