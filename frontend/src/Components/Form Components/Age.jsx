import React from 'react';

function Age({onAgeChange}){
    return(
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">

        <label className="  tracking-wide text-black text-xs font-bold mb-2">
        Age Group <span className='text-red-500'>*</span>
        </label>

        <div>
        <select onChange={e => onAgeChange(e)} className="w-full bg-indigo-50 border border-indigo-50 text-black text-xs py-3 px-4 pr-8 mb-3 rounded" id="age" placeholder="Age">
            <option>Any Age Group</option>
            <option>18-45</option>
            <option>45+</option>
        </select>
        </div>

    </div>
    );
}

export default Age;