import React from 'react'

function Header({...other}) {
  return (
    <div
      {...other}
      className="font-poppins flex justify-center 
       bg-white items-center 
        top-0 w-auto sticky h-24 py-4 px-6 border-b-[1px] shadow-md z-10"
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <h1 className="font-extrabold  text-blue-700 text-lg md:text-3xl">
          VACCINATION <span className='bg-blue-700 text-white rounded-2xl px-2'>CENTER FINDER</span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
