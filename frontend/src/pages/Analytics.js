import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Analytics() {

  const [chartData, setChartData] = useState([]);

  const COLORS = [
    "#0071CE",
    "#FFC220",
    "#4CAF50",
    "#9C27B0",
    "#E0E0E0",
  ];

  const pieData = [
    { name: "Grocery", value: 28 },
    { name: "Beverages", value: 20 },
    { name: "Snacks", value: 15 },
    { name: "Electronics", value: 12 },
    { name: "Others", value: 25 },
  ];

  const topProducts = [
    {
      name: "Coca-Cola Classic 12pk",
      sold: 1840,
      status: "In Stock",
    },
    {
      name: "Great Value Eggs 18ct",
      sold: 1620,
      status: "In Stock",
    },
    {
      name: "Bananas",
      sold: 1410,
      status: "Low Stock",
    },
    {
      name: "Tide Pods 81ct",
      sold: 980,
      status: "Out of Stock",
    },
  ];

  const fetchChartData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8081/api/analytics/stock-vs-sold"
      );

      setChartData(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchChartData();

  }, []);

  return (

    <div className="p-6 bg-[#F2F8FD] min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Analytics
          </h1>

          <p className="text-gray-500 mt-1">
            Smart Inventory Intelligence Center
          </p>

        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">

          Export Report

        </button>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h2 className="text-gray-500 text-sm">
            Inventory Turnover
          </h2>

          <p className="text-3xl font-bold mt-2">
            4.8×
          </p>

          <span className="text-green-600 text-sm font-semibold">
            +0.4 this month
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h2 className="text-gray-500 text-sm">
            Inventory Value
          </h2>

          <p className="text-3xl font-bold mt-2">
            $2.4M
          </p>

          <span className="text-green-600 text-sm font-semibold">
            +8.1%
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h2 className="text-gray-500 text-sm">
            Shrinkage Rate
          </h2>

          <p className="text-3xl font-bold mt-2">
            1.8%
          </p>

          <span className="text-red-500 text-sm font-semibold">
            +0.3%
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow-sm">
          <h2 className="text-gray-500 text-sm">
            Avg Days On Hand
          </h2>

          <p className="text-3xl font-bold mt-2">
            18 Days
          </p>

          <span className="text-green-600 text-sm font-semibold">
            -2 Days
          </span>
        </div>

      </div>

      {/* CHART SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* BAR CHART */}

        <div className="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <div>

              <h2 className="text-xl font-bold text-gray-800">
                Stock Received vs Units Sold
              </h2>

              <p className="text-gray-500 text-sm">
                Last 30 days analytics
              </p>

            </div>

            <button className="text-blue-600 font-semibold">
              Full Report
            </button>

          </div>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={chartData}>

              <XAxis dataKey="product_name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="stock"
                fill="#0071CE"
                radius={[10, 10, 0, 0]}
              />

              <Bar
                dataKey="sold"
                fill="#FFC220"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Stock By Category
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* LOWER SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* TOP PRODUCTS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold text-gray-800">
              Top Fast Moving Products
            </h2>

            <button className="text-blue-600 font-semibold">
              View All
            </button>

          </div>

          <div className="space-y-4">

            {topProducts.map((product, index) => (

              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.sold} units sold
                  </p>

                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold
                  ${
                    product.status === "In Stock"
                      ? "bg-green-100 text-green-600"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >

                  {product.status}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* CATEGORY FILL RATE */}

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Category Fill Rate
          </h2>

          <div className="space-y-5">

            {[
              { name: "Beverages", value: 94 },
              { name: "Dairy", value: 88 },
              { name: "Grocery", value: 91 },
              { name: "Snacks", value: 79 },
              { name: "Laundry", value: 62 },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-medium text-gray-700">
                    {item.name}
                  </span>

                  <span className="font-bold text-gray-700">
                    {item.value}%
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;