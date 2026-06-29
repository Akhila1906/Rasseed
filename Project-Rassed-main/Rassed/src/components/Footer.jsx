import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white shadow-inner p-3 md:px-8 mt-12 text-center text-gray-600 text-sm rounded-t-lg">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="#" className="hover:text-blue-600 transition duration-300 ease-in-out">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition duration-300 ease-in-out">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition duration-300 ease-in-out">Contact Us</Link>
            <Link href="#" className="hover:text-blue-600 transition duration-300 ease-in-out">About Us</Link>
        </div>
        <p className="mt-2">&copy; 2025 Project Raseed. All rights reserved.</p>
    </footer>
  )
}

export default Footer
