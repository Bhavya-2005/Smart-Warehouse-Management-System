function DiscrepancyPanel({

  discrepancies,
  issueType,
  setIssueType,
  description,
  setDescription,
  shipmentId,
  setShipmentId,
  createDiscrepancy

}) {

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Discrepancies
        </h2>

        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-xl text-sm">
          {discrepancies.length} Issues
        </span>

      </div>


      {/* CREATE FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <input
          type="number"
          placeholder="Shipment ID"
          value={shipmentId}
          onChange={(e) =>
            setShipmentId(e.target.value)
          }
          className="border border-gray-200 p-3 rounded-2xl outline-none"
        />

        <select
          value={issueType}
          onChange={(e) =>
            setIssueType(e.target.value)
          }
          className="border border-gray-200 p-3 rounded-2xl outline-none"
        >

          <option value="">
            Select Issue
          </option>

          <option value="Shortage">
            Shortage
          </option>

          <option value="Damaged">
            Damaged
          </option>

          <option value="Wrong SKU">
            Wrong SKU
          </option>

        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border border-gray-200 p-3 rounded-2xl outline-none"
        />

      </div>


      {/* BUTTON */}
      <button
        onClick={createDiscrepancy}
        className="mt-4 bg-black text-white px-5 py-3 rounded-2xl hover:scale-105 transition"
      >
        Create Discrepancy
      </button>


      {/* LIST */}
      <div className="space-y-4 mt-8">

        {
          discrepancies.length === 0 ? (

            <div className="bg-gray-50 p-6 rounded-2xl text-center">

              <p className="text-gray-500">
                No discrepancies found
              </p>

            </div>

          ) : (

            discrepancies.map((item) => (

              <div
                key={item.id}
                className="bg-red-50 p-4 rounded-2xl"
              >

                <div className="flex justify-between items-center">

                  <p className="font-semibold text-red-700">
                    {item.issue_type}
                  </p>

                  <span className="text-xs bg-white px-3 py-1 rounded-xl text-gray-500">
                    {item.status || "Open"}
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  {item.description}
                </p>

              </div>

            ))

          )
        }

      </div>

    </div>

  );
}

export default DiscrepancyPanel;