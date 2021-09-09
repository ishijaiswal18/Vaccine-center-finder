function Vaccine({onVaccineChange}) {
  return (
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="tracking-wide text-black text-xs font-bold mb-2 w-32">
        Vaccine <span className="text-red-500">*</span>
      </label>

      <div>
        <select
          className="w-full bg-indigo-50 border border-indigo-50 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
          name="vac"
          id="vaccine"
          onChange = {(e) => onVaccineChange(e)}
          required
        >
          <option>Either</option>
          <option>COVISHIELD</option>
          <option>COVAXIN</option>
          <option>SPUTNIK V</option>
        </select>
      </div>
    </div>
  );
}

export default Vaccine;
