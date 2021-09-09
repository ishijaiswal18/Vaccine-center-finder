import React from 'react'
import Welcome from "../Welcome Page/Welcome";
import FormPincode from "../Form/FormPincode";
import FormDiscrict from "../Form/FormDistrict";

function Body({ form_state, formSetter }) {
  const buttonClickHandler = (id) => {
    formSetter(id);
  };

  const ButtonCard = ({ name, id }) => (
    <button
      onClick={() => buttonClickHandler(id)}
      className="flex items-center shadow-xl duration-300 rounded-md ease-out transform transition-all hover:scale-105 hover:shadow-md cursor-pointer mt-5 justify-center p-6 text-white bg-red-700"
    >
      <h3 className="text-2xl font-medium">{name}</h3>
    </button>
  );

  return (
    <div className="flex items-center flex-col w-full h-screen mt-11">
      {/* Options Start*/}
      <div className='flex bg-red-500 flex-col relative items-center mt-2 p-8 rounded-lg shadow-md hover:shadow-xl'>
        <h2 className="p-4 rounded-lg text-white font-semibold text-3xl">
          <span className='px-2 py-1 rounded-2xl font-bold text-white'> <span className='text-5xl'>S</span>ELECT <span className='text-5xl'>Q</span>UERY <span className='text-5xl'>T</span>YPE</span>
        </h2>
        <div className="flex space-x-10 items-center">
          <ButtonCard name="BY PINCODE" id={1} />
          <ButtonCard name="BY DISTRICT" id={2} />
        </div>
      </div>
      {/* Options End */}
      {form_state === 0 && <Welcome />}
      {form_state === 1 && <FormPincode />}
      {form_state === 2 && <FormDiscrict />}
    </div>
  );
}

export default Body;
