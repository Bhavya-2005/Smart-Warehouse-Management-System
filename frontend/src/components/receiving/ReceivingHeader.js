import { useState } from "react";

function ReceivingHeader({

  refreshShipments,
  shipments

}) {

  const [loading, setLoading] =
    useState(false);


  // ====================================
  // CLOSE SHIPMENT
  // ====================================

  const handleCloseShipment =
    async () => {

      try {

        if (!shipments?.length) {

          alert(
            "No shipments available"
          );

          return;

        }

        const shipmentId =
          shipments[0].id;

        setLoading(true);

        await fetch(
          `http://localhost:8081/api/receiving/close/${shipmentId}`,
          {
            method: "PUT",
          }
        );

        alert(
          "Shipment Closed Successfully"
        );

        refreshShipments();

      } catch (err) {

        console.log(err);

        alert(
          "Failed to close shipment"
        );

      } finally {

        setLoading(false);

      }

    };


  // ====================================
  // PRINT LABELS
  // ====================================

  const handlePrintLabels =
    async () => {

      try {

        if (!shipments?.length) {

          alert(
            "No shipments available"
          );

          return;

        }

        const shipmentId =
          shipments[0].id;

        const response = await fetch(
          `http://localhost:8081/api/receiving/shipments/${shipmentId}/items`
        );

        const items =
          await response.json();

        const receivedItems =
          items.filter(
            (item) =>
              Number(item.received_qty) > 0
          );

        if (
          receivedItems.length === 0
        ) {

          alert(
            "No received items available for labels"
          );

          return;

        }

        const printWindow =
          window.open(
            "",
            "",
            "width=900,height=700"
          );

        printWindow.document.write(`
          <html>

          <head>

            <title>
              Product Labels
            </title>

            <style>

              body {
                font-family: Arial;
                padding: 20px;
                background: #f8fafc;
              }

              .label {
                border: 2px solid #0f172a;
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 16px;
                background: white;
              }

              .title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }

              .barcode {
                margin-top: 20px;
                font-size: 34px;
                letter-spacing: 6px;
                font-weight: bold;
              }

              .qty {
                margin-top: 10px;
                color: #2563eb;
                font-weight: bold;
              }

            </style>

          </head>

          <body>

            <h1>
              Warehouse Product Labels
            </h1>

            ${receivedItems.map((item) => `

              <div class="label">

                <div class="title">
                  ${item.product_name}
                </div>

                <p>
                  SKU:
                  ${item.sku}
                </p>

                <p>
                  Expected Qty:
                  ${item.expected_qty}
                </p>

                <div class="qty">
                  Received Qty:
                  ${item.received_qty}
                </div>

                <div class="barcode">
                  ||| ${item.sku} |||
                </div>

              </div>

            `).join("")}

          </body>

          </html>
        `);

        printWindow.document.close();

        printWindow.print();

      } catch (err) {

        console.log(err);

        alert(
          "Failed to print labels"
        );

      }

    };


  // ====================================
  // NEW RECEIPT
  // ====================================

  const handleNewReceipt =
    async () => {

      try {

        if (!shipments?.length) {

          alert(
            "No shipments available"
          );

          return;

        }

        const shipment =
          shipments[0];

        const response = await fetch(
          `http://localhost:8081/api/receiving/shipments/${shipment.id}/items`
        );

        const items =
          await response.json();

        const receivedItems =
          items.filter(
            (item) =>
              Number(item.received_qty) > 0
          );

        if (
          receivedItems.length === 0
        ) {

          alert(
            "No received items yet"
          );

          return;

        }

        const receiptWindow =
          window.open(
            "",
            "",
            "width=1000,height=800"
          );

        receiptWindow.document.write(`
          <html>

          <head>

            <title>
              Receiving Receipt
            </title>

            <style>

              body {
                font-family: Arial;
                padding: 30px;
                background: #f9fafb;
              }

              h1 {
                margin-bottom: 10px;
                color: #1e293b;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 30px;
                background: white;
              }

              th, td {
                border: 1px solid #ddd;
                padding: 14px;
                text-align: left;
              }

              th {
                background: #eff6ff;
              }

              .header {
                margin-bottom: 30px;
                background: white;
                padding: 20px;
                border-radius: 12px;
              }

              .status {
                display: inline-block;
                padding: 8px 14px;
                background: #dcfce7;
                color: #166534;
                border-radius: 999px;
                font-weight: bold;
                margin-top: 10px;
              }

              .footer {
                margin-top: 30px;
                font-size: 18px;
                font-weight: bold;
              }

            </style>

          </head>

          <body>

            <h1>
              Warehouse Receiving Receipt
            </h1>

            <div class="header">

              <p>
                ASN:
                ${shipment.asn}
              </p>

              <p>
                Supplier:
                ${shipment.supplier_name}
              </p>

              <p>
                Dock:
                ${shipment.dock}
              </p>

              <p>
                Arrival:
                ${shipment.arrival_time}
              </p>

              <div class="status">
                ${shipment.status}
              </div>

            </div>

            <table>

              <thead>

                <tr>

                  <th>
                    Product
                  </th>

                  <th>
                    SKU
                  </th>

                  <th>
                    Expected
                  </th>

                  <th>
                    Received
                  </th>

                  <th>
                    Damaged
                  </th>

                </tr>

              </thead>

              <tbody>

                ${receivedItems.map((item) => `

                  <tr>

                    <td>
                      ${item.product_name}
                    </td>

                    <td>
                      ${item.sku}
                    </td>

                    <td>
                      ${item.expected_qty}
                    </td>

                    <td>
                      ${item.received_qty}
                    </td>

                    <td>
                      ${item.damaged_qty}
                    </td>

                  </tr>

                `).join("")}

              </tbody>

            </table>

            <div class="footer">

              Total Received Items:
              ${receivedItems.length}

            </div>

          </body>

          </html>
        `);

        receiptWindow.document.close();

      } catch (err) {

        console.log(err);

        alert(
          "Failed to generate receipt"
        );

      }

    };


  return (

    <div className="
      flex
      flex-col
      xl:flex-row
      justify-between
      xl:items-center
      gap-6
      mb-6
    ">

      {/* LEFT */}

      <div>

        <h1 className="
          text-4xl
          font-bold
          text-gray-800
        ">
          Receiving
        </h1>

        <p className="
          text-gray-500
          mt-2
          text-lg
        ">

          {
            shipments.length === 0
              ? "No active shipments"
              : `${shipments.length} shipments in progress`
          }

        </p>

      </div>


      {/* RIGHT */}

      <div className="
        flex
        flex-wrap
        gap-4
      ">

        {/* PRINT LABELS */}

        <button
          onClick={handlePrintLabels}
          className="
            border-2
            border-blue-600
            text-blue-600
            px-5
            py-3
            rounded-2xl
            font-semibold
            hover:bg-blue-50
          "
        >
          Print Labels
        </button>


        {/* CLOSE SHIPMENT */}

        <button
          disabled={loading}
          onClick={handleCloseShipment}
          className="
            bg-yellow-400
            px-5
            py-3
            rounded-2xl
            font-semibold
            hover:bg-yellow-500
            disabled:opacity-50
          "
        >

          {
            loading
              ? "Closing..."
              : "Close Shipment"
          }

        </button>


        {/* NEW RECEIPT */}

        <button
          onClick={handleNewReceipt}
          className="
            bg-blue-600
            text-white
            px-5
            py-3
            rounded-2xl
            font-semibold
            hover:bg-blue-700
          "
        >
          New Receipt
        </button>

      </div>

    </div>
  );
}

export default ReceivingHeader;