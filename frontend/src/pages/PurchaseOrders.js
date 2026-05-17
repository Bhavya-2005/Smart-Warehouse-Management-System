import {
  FaCheck,
  FaClock,
  FaPrint,
  FaEdit,
  FaTimes,
  FaCheckCircle,
  FaInfoCircle,
  FaFileInvoice,
  FaBuilding,
  FaTruck,
} from "react-icons/fa";

function PurchaseOrders() {

  const items = [
    {
      id: 1,
      sku: "SKU-07821",
      name: "Tide Pods Original 81ct",
      category: "Laundry",
      unitCost: 19.5,
      ordered: 120,
      received: 0,
      warehouse: "A-3-04",
      supplierSku: "PG-TD-991",
      eta: "May 14",
      status: "Pending",
    },
    {
      id: 2,
      sku: "SKU-05521",
      name: "Dove Body Wash 22oz",
      category: "Personal Care",
      unitCost: 5.8,
      ordered: 480,
      received: 0,
      warehouse: "B-2-11",
      supplierSku: "UNI-DV-228",
      eta: "May 14",
      status: "Pending",
    },
    {
      id: 3,
      sku: "SKU-08812",
      name: "Pampers Swaddlers Size 1",
      category: "Baby Care",
      unitCost: 28.4,
      ordered: 240,
      received: 0,
      warehouse: "C-1-09",
      supplierSku: "PG-PM-112",
      eta: "May 14",
      status: "Pending",
    },
    {
      id: 4,
      sku: "SKU-06621",
      name: "Crest 3D White Toothpaste",
      category: "Dental",
      unitCost: 9.12,
      ordered: 800,
      received: 0,
      warehouse: "A-1-01",
      supplierSku: "CR-3DW-88",
      eta: "May 14",
      status: "Pending",
    },
  ];

  const total = items.reduce(
    (sum, item) => sum + item.unitCost * item.ordered,
    0
  );

  return (

    <div className="p-6 bg-[#F2F8FD] min-h-screen">

      {/* BREADCRUMB */}

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">

        <span className="text-blue-600 font-semibold cursor-pointer">
          Purchase Orders
        </span>

        <span>/</span>

        <span>PO-20481</span>

      </div>

      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5 mb-6">

        <div>

          <div className="flex items-center gap-4 flex-wrap">

            <h1 className="text-3xl font-bold text-gray-800">
              PO-20481
            </h1>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">

              <FaClock />
              Pending Approval

            </span>

          </div>

          <p className="text-gray-500 mt-3 text-sm">

            Procter & Gamble · Created May 6, 2026 by M. Patel

          </p>

          <div className="flex gap-5 mt-4 flex-wrap text-sm">

            <div>

              <span className="text-gray-400">
                Total Value
              </span>

              <p className="font-bold text-lg text-blue-600">
                $31,440
              </p>

            </div>

            <div>

              <span className="text-gray-400">
                Items
              </span>

              <p className="font-bold text-lg">
                8
              </p>

            </div>

            <div>

              <span className="text-gray-400">
                Delivery Date
              </span>

              <p className="font-bold text-lg">
                May 14
              </p>

            </div>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex gap-3 flex-wrap">

          <button className="border border-red-500 text-red-500 px-4 py-3 rounded-xl font-semibold flex items-center gap-2">

            <FaTimes />
            Cancel

          </button>

          <button className="border border-blue-600 text-blue-600 px-4 py-3 rounded-xl font-semibold flex items-center gap-2">

            <FaPrint />
            Print

          </button>

          <button className="border border-blue-600 text-blue-600 px-4 py-3 rounded-xl font-semibold flex items-center gap-2">

            <FaEdit />
            Edit

          </button>

          <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold flex items-center gap-2">

            <FaCheckCircle />
            Approve PO

          </button>

        </div>

      </div>

      {/* TOP GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* ORDER DETAILS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-5">

            <FaFileInvoice className="text-blue-600" />

            <h2 className="text-xl font-bold text-gray-800">
              Order Details
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex justify-between">

              <span className="text-gray-400">
                PO Number
              </span>

              <span className="font-semibold text-blue-600">
                PO-20481
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Status
              </span>

              <span className="font-semibold text-yellow-600">
                Pending Approval
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Payment Terms
              </span>

              <span className="font-semibold">
                Net 30
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Currency
              </span>

              <span className="font-semibold">
                USD
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Delivery Dock
              </span>

              <span className="font-semibold">
                Dock B
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Receiving Warehouse
              </span>

              <span className="font-semibold">
                Store #4218
              </span>

            </div>

          </div>

        </div>

        {/* SUPPLIER */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-5">

            <FaBuilding className="text-blue-600" />

            <h2 className="text-xl font-bold text-gray-800">
              Supplier Details
            </h2>

          </div>

          <div className="space-y-5">

            <div className="flex justify-between">

              <span className="text-gray-400">
                Supplier
              </span>

              <span className="font-semibold text-blue-600">
                Procter & Gamble
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Vendor ID
              </span>

              <span className="font-semibold">
                VND-00824
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Contact
              </span>

              <span className="font-semibold">
                Sarah Mitchell
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Lead Time
              </span>

              <span className="font-semibold">
                7–10 Days
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                Rating
              </span>

              <span className="font-semibold text-green-600">
                ⭐ 4.8 / 5
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-400">
                On-Time Rate
              </span>

              <span className="font-semibold text-green-600">
                97.4%
              </span>

            </div>

          </div>

        </div>

        {/* WORKFLOW */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-3 mb-6">

            <FaTruck className="text-blue-600" />

            <h2 className="text-xl font-bold text-gray-800">
              Approval Workflow
            </h2>

          </div>

          <div className="space-y-6">

            <div className="flex gap-4">

              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">

                <FaCheck />

              </div>

              <div>

                <p className="font-semibold">
                  PO Created
                </p>

                <p className="text-sm text-gray-500">
                  M. Patel · May 6 · 9:14 AM
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">

                <FaCheck />

              </div>

              <div>

                <p className="font-semibold">
                  Budget Verified
                </p>

                <p className="text-sm text-gray-500">
                  Auto approval
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-9 h-9 rounded-full bg-yellow-400 text-black flex items-center justify-center">

                <FaClock />

              </div>

              <div>

                <p className="font-semibold">
                  Manager Approval
                </p>

                <p className="text-sm text-yellow-600">
                  Waiting for J. Reynolds
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* NOTE */}

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex gap-4 mb-6">

        <FaInfoCircle className="text-yellow-600 mt-1" />

        <p className="text-sm text-gray-700 leading-6">

          This PO requires manager approval before it can be sent to
          the supplier. Orders above $10,000 require approval from
          department management.

        </p>

      </div>

      {/* LINE ITEMS */}

      <div className="bg-white rounded-3xl p-6 shadow-sm overflow-x-auto">

        <div className="flex gap-8 border-b pb-4 mb-6">

          <button className="text-blue-600 border-b-2 border-blue-600 pb-2 font-semibold">

            Line Items

          </button>

          <button className="text-gray-400 font-semibold">
            Documents
          </button>

          <button className="text-gray-400 font-semibold">
            Delivery Schedule
          </button>

          <button className="text-gray-400 font-semibold">
            Activity Log
          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b text-left text-gray-400 text-sm">

              <th className="pb-4">SKU</th>
              <th className="pb-4">Product</th>
              <th className="pb-4">Category</th>
              <th className="pb-4">Warehouse</th>
              <th className="pb-4">Supplier SKU</th>
              <th className="pb-4">Unit Cost</th>
              <th className="pb-4">Ordered</th>
              <th className="pb-4">ETA</th>
              <th className="pb-4">Total</th>
              <th className="pb-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {items.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-5 font-bold text-blue-600">
                  {item.sku}
                </td>

                <td className="py-5 font-semibold">
                  {item.name}
                </td>

                <td className="py-5">
                  {item.category}
                </td>

                <td className="py-5">
                  {item.warehouse}
                </td>

                <td className="py-5 text-gray-500">
                  {item.supplierSku}
                </td>

                <td className="py-5">
                  ${item.unitCost}
                </td>

                <td className="py-5 font-semibold">
                  {item.ordered}
                </td>

                <td className="py-5">
                  {item.eta}
                </td>

                <td className="py-5 font-bold">
                  $
                  {(item.unitCost * item.ordered).toLocaleString()}
                </td>

                <td className="py-5">

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">

                    {item.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* TOTALS */}

        <div className="bg-gray-50 rounded-2xl p-6 mt-6 max-w-md ml-auto">

          <div className="flex justify-between py-2 text-gray-600">

            <span>
              Subtotal
            </span>

            <span>
              ${total.toLocaleString()}
            </span>

          </div>

          <div className="flex justify-between py-2 text-gray-600">

            <span>
              Shipping
            </span>

            <span>
              $152
            </span>

          </div>

          <div className="flex justify-between py-2 text-gray-600">

            <span>
              Tax
            </span>

            <span>
              $0
            </span>

          </div>

          <div className="flex justify-between py-4 border-t mt-3 text-xl font-bold">

            <span>
              Total
            </span>

            <span className="text-blue-600">
              ${(total + 152).toLocaleString()}
            </span>

          </div>

        </div>

      </div>

      {/* ACTIONS */}

      <div className="flex justify-end gap-4 mt-6 flex-wrap">

        <button className="border border-red-500 text-red-500 px-5 py-3 rounded-xl font-semibold">

          Reject & Return

        </button>

        <button className="border border-blue-600 text-blue-600 px-5 py-3 rounded-xl font-semibold">

          Request Changes

        </button>

        <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-3">

          <FaCheckCircle />

          Approve PO — ${(total + 152).toLocaleString()}

        </button>

      </div>

    </div>
  );
}

export default PurchaseOrders;