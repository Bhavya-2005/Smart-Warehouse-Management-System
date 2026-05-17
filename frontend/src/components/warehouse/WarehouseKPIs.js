function WarehouseKPIs() {

  const cards = [
    {
      title: "Total Bin Locations",
      value: "1,240",
      sub: "Across 3 zones",
    },
    {
      title: "Capacity Utilized",
      value: "78%",
      sub: "968 / 1240 occupied",
    },
    {
      title: "Cold Storage Temp",
      value: "34°F",
      sub: "Zone C normal",
    },
    {
      title: "Misplaced Items",
      value: "12",
      sub: "Require relocation",
    },
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white p-5 rounded-3xl shadow-sm"
        >

          <h2 className="text-gray-500 text-sm">
            {card.title}
          </h2>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>

          <p className="text-sm text-gray-400 mt-1">
            {card.sub}
          </p>

        </div>

      ))}

    </div>
  );
}

export default WarehouseKPIs;