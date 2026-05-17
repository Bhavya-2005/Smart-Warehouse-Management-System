function FloorMap() {

  const rows = [1, 2, 3, 4, 5];
  const bins = [1, 2, 3, 4, 5, 6, 7];

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold text-gray-800">
          Interactive Floor Map
        </h2>

        <span className="text-blue-600 font-semibold">
          Bin A-3-04 Selected
        </span>

      </div>

      <div className="space-y-4">

        {rows.map((row) => (

          <div
            key={row}
            className="flex items-center gap-3"
          >

            <div className="w-10 text-gray-400 font-bold">
              A-{row}
            </div>

            {bins.map((bin) => (

              <div
                key={bin}
                className={`w-12 h-10 rounded-lg flex items-center justify-center text-sm font-bold cursor-pointer
                ${
                  row === 3 && bin === 4
                    ? "bg-yellow-400 text-black"
                    : bin % 4 === 0
                    ? "bg-yellow-100 text-yellow-700"
                    : bin % 3 === 0
                    ? "bg-blue-200 text-blue-700"
                    : "bg-blue-600 text-white"
                }`}
              >

                {bin}

              </div>

            ))}

          </div>

        ))}

      </div>

    </div>
  );
}

export default FloorMap;