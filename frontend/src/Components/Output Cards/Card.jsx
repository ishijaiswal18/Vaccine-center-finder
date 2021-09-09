function Card({ session }) {

  return (
    <div className="w-3/6 p-4">
      <div className="block p-4 bg-gray-50 shadow-md hover:shadow-xl transition-all duration-200 rounded-lg overflow-hidden">
        <div className="p-4">
          <span className="inline-block text-blue-500 pr-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
            Vaccine Center
          </span>
          <h2 className="mt-2 mb-2 text-red-400 font-bold text-2xl">{session["name"]}</h2>
          <p className="text-sm text-red-300 font-semibold">{session["address"]}</p>
          <div className="mt-3 flex items-center">
            <span className="text-indigo-400 text-lg font-bold">{session["vaccine"]}</span>&nbsp;
          </div>
        </div>
        <div className="p-4 border-t border-b text-sm text-gray-700">
          <span className="flex items-center mb-1 text-yellow-500 font-bold">
            Min Age Limit: {session["min_age_limit"]}
          </span>
        </div>
        <div className="p-4 text-xs text-gray-700">
          <span className="flex text-green-700 font-bold items-center mb-2">
            Slots: {session['slots']}
          </span>
          <span className="flex text-green-500 items-center">
            Timings: {session["from"]} - {session["to"]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
