import { useEffect, useState } from "react";
import axios from "axios";

function Alerts() {

  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8081/api/products/low-stock"
      );

      setAlerts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchAlerts();

  }, []);

  return (

    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Stock Alerts
        </h1>

        <button className="text-blue-600 font-bold">
          View All
        </button>

      </div>

      <div className="space-y-4">

        {alerts.length === 0 ? (

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

            <h2 className="text-green-700 font-bold text-lg">
              No Low Stock Alerts
            </h2>

            <p className="text-green-600 mt-1">
              Inventory levels are healthy
            </p>

          </div>

        ) : (

          alerts.map((product) => (

            <div
              key={product.id}
              className="bg-red-50 border border-red-200 rounded-2xl p-5"
            >

              <h2 className="text-red-700 font-bold text-xl">

                {product.product_name}

              </h2>

              <p className="text-gray-600 mt-2">

                Only {product.quantity} left in stock

              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Alerts;