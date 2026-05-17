function ZoneCapacity() {

  const zones = [
    {
      name: "Zone A",
      value: 84,
    },
    {
      name: "Zone B",
      value: 71,
    },
    {
      name: "Zone C",
      value: 62,
    },
  ];

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Zone Capacity
      </h2>

      <div className="space-y-5">

        {zones.map((zone, index) => (

          <div key={index}>

            <div className="flex justify-between mb-2">

              <span className="font-semibold">
                {zone.name}
              </span>

              <span className="font-bold">
                {zone.value}%
              </span>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">

              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: `${zone.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ZoneCapacity;