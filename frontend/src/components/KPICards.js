import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaBoxes,
  FaExclamationTriangle,
  FaTruck,
  FaDollarSign,
} from "react-icons/fa";

function KPICards() {

  const [kpi, setKpi] = useState({
    totalProducts: 0,
    totalStock: 0,
    inventoryValue: 0,
  });

  const fetchKPI = async () => {

    try {

      const res = await axios.get(
        "https://https://smart-inventory-backend-m3wf.onrender.coms/api/products/kpi"
      );

      setKpi(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchKPI();

  }, []);

  return (

    <div className="grid grid-cols-4 gap-5">

      {/* TOTAL PRODUCTS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div className="bg-blue-100 p-4 rounded-2xl">

            <FaBoxes className="text-blue-600 text-2xl" />

          </div>

          <span className="text-green-600 font-bold">
            ↑ Live
          </span>

        </div>

        <h1 className="text-5xl font-black mt-6">
          {kpi.totalProducts || 0}
        </h1>

        <p className="text-gray-500 mt-3 text-xl">
          Total Products
        </p>

      </div>

      {/* TOTAL STOCK */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div className="bg-red-100 p-4 rounded-2xl">

            <FaExclamationTriangle className="text-red-500 text-2xl" />

          </div>

          <span className="text-green-600 font-bold">
            ↑ Live
          </span>

        </div>

        <h1 className="text-5xl font-black mt-6">
          {kpi.totalStock || 0}
        </h1>

        <p className="text-gray-500 mt-3 text-xl">
          Total Stock
        </p>

      </div>

      {/* DELIVERIES */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div className="bg-green-100 p-4 rounded-2xl">

            <FaTruck className="text-green-600 text-2xl" />

          </div>

          <span className="text-green-600 font-bold">
            Active
          </span>

        </div>

        <h1 className="text-5xl font-black mt-6">
          7
        </h1>

        <p className="text-gray-500 mt-3 text-xl">
          Pending Deliveries
        </p>

      </div>

      {/* INVENTORY VALUE */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex justify-between items-center">

          <div className="bg-yellow-100 p-4 rounded-2xl">

            <FaDollarSign className="text-yellow-600 text-2xl" />

          </div>

          <span className="text-green-600 font-bold">
            ↑ Live
          </span>

        </div>

        <h1 className="text-5xl font-black mt-6">
          ₹{kpi.inventoryValue || 0}
        </h1>

        <p className="text-gray-500 mt-3 text-xl">
          Inventory Value
        </p>

      </div>

    </div>
  );
}

export default KPICards;