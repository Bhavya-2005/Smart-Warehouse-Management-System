function ShipmentQueue({

  shipments,
  selectedShipment,
  setSelectedShipment

}) {

  return (

    <div className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      h-full
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
        ">
          Active Shipments
        </h2>

        <div className="
          bg-blue-100
          text-blue-700
          px-4
          py-2
          rounded-2xl
          text-sm
          font-semibold
        ">
          {shipments.length}
        </div>

      </div>


      <div className="space-y-4">

        {
          shipments.length === 0 ? (

            <div className="
              text-center
              text-gray-500
              py-10
            ">
              No shipments
            </div>

          ) : (

            shipments.map((shipment) => (

              <div
                key={shipment.id}
                onClick={() =>
                  setSelectedShipment(shipment)
                }
                className={`
                  border
                  rounded-3xl
                  p-5
                  cursor-pointer
                  transition
                  hover:scale-[1.01]

                  ${
                    selectedShipment?.id === shipment.id

                      ? "border-blue-500 bg-blue-50"

                      : "border-gray-200 bg-white"
                  }
                `}
              >

                <div className="
                  flex
                  justify-between
                  items-start
                ">

                  <div>

                    <h3 className="
                      text-lg
                      font-bold
                    ">
                      {shipment.asn}
                    </h3>

                    <p className="
                      text-gray-500
                      mt-1
                    ">
                      {shipment.supplier_name}
                    </p>

                  </div>

                  <div className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                  ">
                    {shipment.status}
                  </div>

                </div>


                <div className="
                  grid
                  grid-cols-2
                  gap-4
                  mt-5
                ">

                  <div>

                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Dock
                    </p>

                    <p className="
                      font-semibold
                      mt-1
                    ">
                      {shipment.dock}
                    </p>

                  </div>

                  <div>

                    <p className="
                      text-xs
                      text-gray-400
                    ">
                      Store
                    </p>

                    <p className="
                      font-semibold
                      mt-1
                    ">
                      {shipment.store_number}
                    </p>

                  </div>

                </div>

              </div>

            ))
          )
        }

      </div>

    </div>

  );
}

export default ShipmentQueue;