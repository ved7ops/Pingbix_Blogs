import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaChevronRight } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/">
              <Image 
                src="/navbar-logo.png"
                alt="Pingbix Logo" 
                width={120} 
                height={40}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-600 max-w-md">
              Follow us on social media for the latest <br /> news and insights. Subscribe to our<br /> newsletter for exclusive offers and <br /> valuable content.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/digitalpingbix/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <FaFacebook size={20} className="text-gray-600" />
              </a>
              <a href="http://x.com/digitalpingbix" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <FaTwitter size={20} className="text-gray-600" />
              </a>
              <a href="https://www.instagram.com/digitalpingbix/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <FaInstagram size={20} className="text-gray-600" />
              </a>
              <a href="https://www.linkedin.com/company/pingbix/" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <FaLinkedin size={20} className="text-gray-600" />
              </a>
              <a href="https://www.youtube.com/channel/UC3QJ8hL6SqfypY2sdj33lSw" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                <FaYoutube size={20} className="text-gray-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                  <FaChevronRight size={12} />
                  <span>Latest News & Blog</span>
                </Link>
              </li>
              <li>
                <Link href="https://pingbix.com/end_user_policy" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                  <FaChevronRight size={12} />
                  <span>Privacy & Policy</span>
                </Link>
              </li>
              <li>
                <Link href="https://pingbix.com/careers" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                  <FaChevronRight size={12} />
                  <span>Career</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="https://app.pingbix.com/" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                  <FaChevronRight size={12} />
                  <span>My Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="https://pingbix.com/our_team" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
                  <FaChevronRight size={12} />
                  <span>Meet The Team</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>Copyright 2018-2024 © Pingbix : Unit Of Colortext Digital Solutions Private Limited All Rights Reserved.

</p>
        </div>
      </div>
    </footer>
  );
} 