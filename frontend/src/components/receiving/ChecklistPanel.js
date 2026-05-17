function ChecklistPanel() {

  const tasks = [
    "Verify ASN document",
    "Inspect packaging condition",
    "Scan & count items",
    "Resolve discrepancies",
    "Update stock levels",
  ];

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Receiving Checklist
      </h2>

      <div className="space-y-4">

        {tasks.map((task, index) => (

          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >

            <div className="flex items-center gap-4">

              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">

                {index + 1}

              </div>

              <span className="font-medium text-gray-700">
                {task}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ChecklistPanel;