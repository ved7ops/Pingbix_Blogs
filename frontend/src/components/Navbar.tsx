'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/navbar-logo.png"
              alt="Pingbix Logo"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="http://127.0.0.1:1337/admin" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <FaSignInAlt size={16} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button with Animation */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                transition-all duration-300 transform
                ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}
              `}>
                <FaBars size={24} />
              </div>
              <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                transition-all duration-300 transform
                ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}
              `}>
                <FaTimes size={24} />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="http://127.0.0.1:1337/admin" 
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSignInAlt size={16} />
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 