import React, { useState, useEffect } from "react";
import axios from "axios";
import Age from "../Form Components/Age";
import Vaccine from "../Form Components/Vaccine";
import Dose from "../Form Components/Dose";
import DateComp from "../Form Components/DateComp";
import Card from "../Output Cards/Card";

function FormDiscrict(props) {
  const [stateList, setStateList] = useState([]);
  const [state_id, setState_id] = useState("1");
  const [districtList, setDistrictList] = useState([]);
  const [result, setResult] = useState([]);
  const [districtObj, setDistrictObj] = useState({
    district: "1",
    date: new Date(),
    vaccine: "Either",
    dose: "Both",
    ageGroup: "Any Age Group",
  });
  const [queryBool, setqueryBool] = useState(false);

  const onDateChangeHandler = (e) => {
    setDistrictObj((prevState) => ({ ...prevState, date: e.target.value }));
  };

  const onVaccineChangeHandler = (e) => {
    setDistrictObj((prevState) => ({ ...prevState, vaccine: e.target.value }));
  };

  const onDoseChangeHandler = (e) => {
    setDistrictObj((prevState) => ({ ...prevState, dose: e.target.value }));
  };

  const onAgeChangeHandler = (e) => {
    setDistrictObj((prevState) => ({ ...prevState, ageGroup: e.target.value }));
  };

  useEffect(() => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states", {})
      .then(function (response) {
        setStateList(response.data.states);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onChangeState = (v) => {
    setState_id(v.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`,
        {}
      )
      .then(function (response) {
        setDistrictList(response.data.districts);

        setDistrictObj((prevState) => ({
          ...prevState,
          district: response.data.districts[0].district_id,
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [state_id]);

  const onChangeDistrict = (v) => {
    setDistrictObj((prevState) => ({ ...prevState, district: v.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/district", districtObj)
      .then((response) => {
        setqueryBool(true);
        window.scrollTo(0, 600);
        setResult(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen bg-blue-50">
      <div className="mx-auto max-w-2xl py-20 px-12 lg:px-24">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="bg-white shadow-md transition-all duration-200 rounded-2xl px-8 pt-6 pb-8 mb-4 hover:shadow-xl">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label className="tracking-wide text-black text-sm font-bold mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  onChange={(values) => onChangeState(values)}
                  className="w-full bg-indigo-50 border border-indigo-50 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                  id="State"
                  searchable="true"
                >
                  {stateList.map((states) => (
                    <option
                      value={states.state_id}
                      id={states.state_id}
                      key={states.state_id}
                    >
                      {states.state_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label className=" tracking-wide text-black text-sm font-bold mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  onChange={(values) => onChangeDistrict(values)}
                  className="w-full bg-indigo-50 border border-indigo-50 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                  id="State"
                  searchable="true"
                >
                  {districtList.map((districts) => (
                    <option
                      value={districts.district_id}
                      key={districts.district_id}
                    >
                      {districts.district_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <DateComp onDateChange={onDateChangeHandler} />

            <div className="-mx-3 md:flex mb-2">
              <Vaccine onVaccineChange={onVaccineChangeHandler} />
              <Dose onDoseChange={onDoseChangeHandler} />
              <Age onAgeChange={onAgeChangeHandler} />
            </div>
            <div className="flex items-center justify-center mt-6 w-full">
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

export default FormDiscrict;
