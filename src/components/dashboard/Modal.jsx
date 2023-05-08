import React from 'react'
import { motion } from "framer-motion";




const Modal = (props) => {

    const animations = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 }

    }

    return (
        <div>
            <motion.div

                className="bg-black/60 inset-0 flex items-center justify-center z-50 opacity-100 absolute duration-150">
                <motion.div
                    initial={animations.initial}
                    animate={animations.animate}
                    exit={{ opacity: 0, y: -20 }}
                    transition={animations.transition}
                    className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-xl font-semibold mb-4">{props.head}</h3>
                    <form onSubmit={props.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-semibold mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
                                placeholder="Enter name"
                                value={props.name}
                                onChange={(e) => props.setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
                                placeholder="Enter email"
                                value={props.email}
                                onChange={(e) => props.setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block font-semibold mb-2">
                                Phone
                            </label>
                            <input
                                type="number"
                                id="phone"
                                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
                                placeholder="Enter phone"
                                value={props.phone}
                                onChange={(e) => props.setPhone(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-300 mr-2"
                                type="submit"
                            >
                                Add
                            </button>
                            <button
                                type='text'
                                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300"
                                onClick={props.handleModalClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Modal
