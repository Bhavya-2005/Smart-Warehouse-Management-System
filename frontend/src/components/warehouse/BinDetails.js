function BinDetails() {

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Bin Details
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">Location</span>
          <span className="font-semibold">A-3-04</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">SKU</span>
          <span className="font-semibold text-blue-600">
            SKU-11204
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Product</span>
          <span className="font-semibold">
            Coca-Cola Classic
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Units Stored</span>
          <span className="font-semibold">
            410
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Capacity</span>
          <span className="font-semibold">
            500 Units
          </span>
        </div>

      </div>

    </div>
  );
}

export default BinDetails;