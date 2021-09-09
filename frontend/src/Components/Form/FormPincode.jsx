import { useState } from "react";
import Age from "../Form Components/Age";
import Vaccine from "../Form Components/Vaccine";
import Dose from "../Form Components/Dose";
import DateComp from "../Form Components/DateComp";
import axios from "axios";
import Card from "../Output Cards/Card";

function FormPincode() {
  const [pincodeObj, setpincodeObj] = useState({
    pincode: 0,
    date: new Date(),
    vaccine: "Either",
    dose: "Both",
    ageGroup: "Any Age Group",
  });

  const [queryBool, setqueryBool] = useState(false);

  const [result, setResult] = useState([]);

  const onDateChangeHandler = (e) => {
    setpincodeObj((prevState) => ({ ...prevState, date: e.target.value }));
  };

  const onVaccineChangeHandler = (e) => {
    setpincodeObj((prevState) => ({ ...prevState, vaccine: e.target.value }));
  };

  const onDoseChangeHandler = (e) => {
    setpincodeObj((prevState) => ({ ...prevState, dose: e.target.value }));
  };

  const onAgeChangeHandler = (e) => {
    setpincodeObj((prevState) => ({ ...prevState, ageGroup: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/pincode", pincodeObj)
      .then((response) => {
        setResult(response.data.response);
        window.scrollTo(0, 1000);
        setqueryBool(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen h-full bg-blue-50">
      <div className="mx-auto max-w-2xl py-20 px-12 lg:px-24">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="bg-white shadow-md transition-all duration-200 rounded-2xl px-8 pt-6 pb-8 mb-4 hover:shadow-xl">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3">
                  <label className=" tracking-wide text-black text-sm font-bold mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full bg-indigo-50 focus:border-indigo-500 outline-none text-black border-2 border-indigo-50 rounded py-3 px-4 mb-3"
                    id="pincode"
                    type="number"
                    min={100000}
                    max={999999}
                    value={pincodeObj.pincode}
                    onChange={(e) =>
                      setpincodeObj((prevState) => ({
                        ...prevState,
                        pincode: e.target.value,
                      }))
                    }
                    placeholder="000000"
                    required
                  />
                </div>
              </div>

              <DateComp onDateChange={onDateChangeHandler} />

              <div className="-mx-3 md:flex mb-2">
                <Vaccine onVaccineChange={onVaccineChangeHandler} />
                <Dose onDoseChange={onDoseChangeHandler} />
                <Age onAgeChange={onAgeChangeHandler} />
              </div>
              <div className="flex items-center mt-6 justify-center w-full">
                  <button className=" bg-transparent hover:bg-indigo-700 bg-indigo-500 w-full font-semibold text-white py-2 px-4 border-2 border-indigo-500 hover:border-transparent rounded">
                    Submit
                  </button>
              </div>
            </div>
          </form>
      </div>

      <div className="relative flex flex-col bg-blue-50 items-center justify-between">
        {queryBool === true && (
          <h3 className="text-white p-6 bg-green-500 shadow-lg rounded-md font-bold text-2xl mb-4">
            {result.length} VACCINE CENTERS FOUND!
          </h3>
        )}
        {result.length > 0 &&
          result.map((session) => (
            <Card key={session["name"]} session={session} />
          ))}
      </div>
    </div>
  );
}

export default FormPincode;
