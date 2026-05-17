function WarehouseHeader() {

  return (

    <div className="flex justify-between items-center mb-6">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Warehouse Management
        </h1>

        <p className="text-gray-500 mt-1">
          Store #4218 · 1,240 bin locations
        </p>

      </div>

      <div className="flex gap-3">

        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-semibold">

          Full Map

        </button>

        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl font-semibold">

          Export

        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold">

          Add Location

        </button>

      </div>

    </div>
  );
}

export default WarehouseHeader;