function ReceivingKPIs({

  shipments,
  discrepancies

}) {

  // ====================================
  // CALCULATIONS
  // ====================================

  const inProgress =
    shipments.filter(
      (item) =>
        item.status === "In Progress"
    ).length;

  const completed =
    shipments.filter(
      (item) =>
        item.status === "Complete"
    ).length;

  const expectedToday =
    shipments.length;

  const totalReceived =
    shipments.reduce(
      (total, item) =>
        total +
        Number(item.received_items || 0),
      0
    );

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      mt-6
    ">

      {/* EXPECTED */}

      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
      ">

        <p className="text-gray-500">
          Expected Today
        </p>

        <h2 className="
          text-4xl
          font-bold
          mt-2
        ">
          {expectedToday}
        </h2>

        <p className="
          text-sm
          text-gray-400
          mt-2
        ">
          {inProgress} in progress
        </p>

      </div>


      {/* RECEIVED */}

      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
      ">

        <p className="text-gray-500">
          Units Received
        </p>

        <h2 className="
          text-4xl
          font-bold
          mt-2
        ">
          {totalReceived}
        </h2>

        <p className="
          text-sm
          text-gray-400
          mt-2
        ">
          Across shipments
        </p>

      </div>


      {/* DISCREPANCIES */}

      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
      ">

        <p className="text-gray-500">
          Discrepancies
        </p>

        <h2 className="
          text-4xl
          font-bold
          mt-2
        ">
          {discrepancies.length}
        </h2>

        <p className="
          text-sm
          text-gray-400
          mt-2
        ">
          Requires review
        </p>

      </div>


      {/* COMPLETED */}

      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
      ">

        <p className="text-gray-500">
          Completed
        </p>

        <h2 className="
          text-4xl
          font-bold
          mt-2
        ">
          {completed}
        </h2>

        <p className="
          text-sm
          text-gray-400
          mt-2
        ">
          Closed shipments
        </p>

      </div>

    </div>

  );
}

export default ReceivingKPIs;