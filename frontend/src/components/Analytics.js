function Analytics() {

  return (

    <div className="bg-white rounded-xl border p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="font-bold text-lg">
          Stock vs Sold
        </h1>

        <button className="text-blue-600 text-sm font-semibold">
          View Report
        </button>

      </div>

      <div className="flex items-end justify-between h-64">

        <div className="flex gap-2 items-end">
          <div className="w-6 h-40 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-28 bg-yellow-400 rounded-t"></div>
        </div>

        <div className="flex gap-2 items-end">
          <div className="w-6 h-32 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-48 bg-yellow-400 rounded-t"></div>
        </div>

        <div className="flex gap-2 items-end">
          <div className="w-6 h-52 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-36 bg-yellow-400 rounded-t"></div>
        </div>

        <div className="flex gap-2 items-end">
          <div className="w-6 h-24 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-44 bg-yellow-400 rounded-t"></div>
        </div>

        <div className="flex gap-2 items-end">
          <div className="w-6 h-56 bg-blue-600 rounded-t"></div>
          <div className="w-6 h-36 bg-yellow-400 rounded-t"></div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;