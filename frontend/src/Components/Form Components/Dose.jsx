function Dose({ onDoseChange }) {
  return (
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="  tracking-wide text-black text-xs font-bold mb-2">
        Select Dose <span className="text-red-500">*</span>
      </label>

      <div>
        <select
          onChange={(e) => onDoseChange(e)}
          className="w-full bg-indigo-50 border border-indigo-50 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
          id="dose"
        >
          <option>Both</option>
          <option>Dose 1</option>
          <option>Dose 2</option>
        </select>
      </div>
    </div>
  );
}

export default Dose;
