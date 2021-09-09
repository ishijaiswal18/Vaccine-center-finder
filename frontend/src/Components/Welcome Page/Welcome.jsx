import React from 'react'
import doc_img from "../Images/doc_vac.jpg";

function Welcome() {
  return (
    <div className="flex flex-col h-auto mx-auto mt-10 rounded-lg p-6 bg-blue-500 text-white">
      <h1 className="text-3xl font-medium text-gray-50"> Welcome To Our App</h1>

      <p className="text-lg text-blue-200 my-4">
        Please proceed by selecting a query option from the buttons above.
      </p>

      <img
        src={doc_img}
        className="relative object-contain self-center rounded-2xl"
        height={400}
        width={400}
        alt="Doctor"
      />
    </div>
  );
}

export default Welcome;
