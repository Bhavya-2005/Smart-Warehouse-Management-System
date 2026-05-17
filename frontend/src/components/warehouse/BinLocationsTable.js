function BinLocationsTable() {

  const bins = [
    {
      location: "A-3-04",
      sku: "SKU-11204",
      product: "Coca-Cola Classic",
      units: 410,
      capacity: 500,
      fill: "82%",
      status: "Full",
    },
    {
      location: "A-2-03",
      sku: "SKU-00341",
      product: "Milk 1gal",
      units: 2,
      capacity: 200,
      fill: "1%",
      status: "Low",
    },
    {
      location: "A-4-05",
      sku: "---",
      product: "Empty Bin",
      units: 0,
      capacity: 300,
      fill: "0%",
      status: "Empty",
    },
  ];

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm overflow-x-auto">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Bin Locations
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b text-left text-gray-400 text-sm">

            <th className="pb-4">Location</th>
            <th className="pb-4">SKU</th>
            <th className="pb-4">Product</th>
            <th className="pb-4">Units</th>
            <th className="pb-4">Capacity</th>
            <th className="pb-4">Fill</th>
            <th className="pb-4">Status</th>

          </tr>

        </thead>

        <tbody>

          {bins.map((bin, index) => (

            <tr
              key={index}
              className="border-b"
            >

              <td className="py-5 font-bold text-blue-600">
                {bin.location}
              </td>

              <td className="py-5">
                {bin.sku}
              </td>

              <td className="py-5">
                {bin.product}
              </td>

              <td className="py-5 font-semibold">
                {bin.units}
              </td>

              <td className="py-5">
                {bin.capacity}
              </td>

              <td className="py-5">
                {bin.fill}
              </td>

              <td className="py-5">

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    bin.status === "Full"
                      ? "bg-blue-100 text-blue-600"
                      : bin.status === "Low"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >

                  {bin.status}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default BinLocationsTable;