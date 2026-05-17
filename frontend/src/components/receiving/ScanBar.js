import { useState } from "react";

function ScanBar({

  barcode,
  setBarcode,
  lookupResult,
  setLookupResult

}) {

  const [loading, setLoading] =
    useState(false);



  // AUTO SCAN
  const handleScan = async () => {

    try {

      if (!barcode.trim()) return;

      setLoading(true);



      const response = await fetch(
        "https://smart-inventory-backend.onrender.coms/api/receiving/scan",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            barcode,
          }),
        }
      );



      const data =
        await response.json();



      setLookupResult([data]);



      setBarcode("");



      const audio =
        new Audio(
          "https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
        );

      audio.play();

    } catch (err) {

      console.log(err);

      alert("Item not found");

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="
      bg-white
      rounded-3xl
      p-8
      mt-6
      shadow-sm
      border
    ">

      <div className="
        flex
        flex-col
        xl:flex-row
        gap-6
        xl:items-center
      ">

        <div className="
          bg-blue-100
          p-6
          rounded-3xl
          text-5xl
        ">
          📦
        </div>



        <div className="flex-1">

          <h2 className="
            text-4xl
            font-bold
          ">
            Warehouse Scanner
          </h2>

          <p className="
            text-gray-500
            mt-2
            text-lg
          ">
            Scan barcode or SKU to auto receive items
          </p>

        </div>



        <input
          autoFocus
          type="text"
          placeholder="Scan barcode..."
          value={barcode}
          onChange={(e) =>
            setBarcode(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              handleScan();

            }

          }}
          className="
            border-2
            border-blue-200
            focus:border-blue-500
            outline-none
            rounded-3xl
            px-6
            py-5
            text-2xl
            w-full
            xl:w-[420px]
          "
        />

      </div>



      <div className="
        flex
        gap-4
        mt-6
      ">

        <div className="
          bg-green-100
          text-green-700
          px-5
          py-3
          rounded-full
          font-semibold
        ">
          Scanner Active
        </div>



        <div className="
          bg-blue-100
          text-blue-700
          px-5
          py-3
          rounded-full
          font-semibold
        ">
          Auto Receive Enabled
        </div>



        {
          loading && (

            <div className="
              bg-yellow-100
              text-yellow-700
              px-5
              py-3
              rounded-full
              font-semibold
            ">
              Processing Scan...
            </div>

          )
        }

      </div>



      {
        lookupResult.length > 0 && (

          <div className="
            mt-8
            bg-green-50
            border
            border-green-200
            rounded-3xl
            p-6
          ">

            <h3 className="
              text-2xl
              font-bold
              text-green-700
            ">
              Last Scanned Item
            </h3>



            <div className="
              mt-5
              grid
              grid-cols-2
              xl:grid-cols-4
              gap-6
            ">

              <Info
                label="Product"
                value={
                  lookupResult[0]
                    ?.product_name
                }
              />



              <Info
                label="SKU"
                value={
                  lookupResult[0]
                    ?.sku
                }
              />



              <Info
                label="Received"
                value={
                  lookupResult[0]
                    ?.received_qty
                }
              />



              <Info
                label="Expected"
                value={
                  lookupResult[0]
                    ?.expected_qty
                }
              />

            </div>

          </div>

        )
      }

    </div>

  );
}



function Info({
  label,
  value
}) {

  return (

    <div>

      <p className="
        text-gray-500
        text-sm
      ">
        {label}
      </p>

      <p className="
        text-2xl
        font-bold
        mt-1
      ">
        {value}
      </p>

    </div>

  );

}

export default ScanBar;