function WarehouseTabs() {

  const tabs = [
    "Main Floor",
    "Cold Storage",
    "Overflow",
    "Dock Area",
  ];

  return (

    <div className="bg-white p-4 rounded-3xl shadow-sm mt-6">

      <div className="flex gap-4 flex-wrap">

        {tabs.map((tab, index) => (

          <button
            key={index}
            className={`px-5 py-3 rounded-xl font-semibold
            ${
              index === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >

            {tab}

          </button>

        ))}

      </div>

    </div>
  );
}

export default WarehouseTabs;