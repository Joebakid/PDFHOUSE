import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

function Nav({ Btn, LinkCustom }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='custom-container rounded-lg bg-gray-100 shadow-md flex flex-col md:flex-row justify-between items-center p-4 m-2 relative'>
      {/* Top: Logo and Hamburger */}
      <div className='flex justify-between items-center w-full md:w-auto'>
        <Link to='/' className='text-xl font-bold'>
          PDFHOUSE
        </Link>

        {/* Hamburger icon */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} aria-label='Toggle Menu'>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Underline accent below logo (optional, mobile only) */}
      {isOpen && <div className=' h-[3px] bg-[#00CCFF] rounded-full mt-2 mb-1 md:hidden'></div>}

      {/* Mobile Menu (animated) */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-100 md:bg-transparent transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        } md:translate-y-0 md:opacity-100 md:pointer-events-auto`}>
        <ul className='flex flex-col md:flex-row md:items-center md:gap-6 gap-2 text-center p-4 md:p-0'>
          <li className='cursor-pointer hover:text-[#00CCFF]'>About Us</li>
          <a
            href='https://t.me/bakid1'
            target='_blank'
            className='cursor-pointer hover:text-[#00CCFF]'>
            Request PDF
          </a>
          <a
            href='https://t.me/bakid1'
            target='_blank'
            className='cursor-pointer hover:text-[#00CCFF]'>
            Add a PDF
          </a>

          {/* Button inside mobile menu */}
          <div className='md:hidden mt-2'>
            <LinkCustom
              to='/pdfs'
              text='View PDFs'
              className='bg-[#00CCFF] text-white px-5 py-2 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF]'
            />
          </div>
        </ul>
      </div>

      {/* Desktop Button */}
      <div className='hidden md:block'>
        <LinkCustom
          to='/pdfs'
          text='View PDFs'
          className='bg-[#00CCFF] text-white px-5 py-2 rounded-lg border border-[#00CCFF] transition-all duration-300 hover:bg-white hover:text-[#00CCFF]'
        />
      </div>
    </nav>
  );
}

export default Nav;
