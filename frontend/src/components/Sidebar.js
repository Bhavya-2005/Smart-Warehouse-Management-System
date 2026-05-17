import {
  FaChartPie,
  FaBoxOpen,
  FaWarehouse,
  FaUsers,
  FaChartBar,
  FaTruck,
  FaCog,
  FaFileInvoice,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "bg-blue-100 text-blue-700 font-semibold"
      : "hover:bg-gray-100";

  return (

    <div className="w-64 bg-white border-r min-h-screen">

      {/* LOGO */}

      <div className="h-16 bg-blue-600 flex items-center px-6">

        <h1 className="text-white text-2xl font-black">
          NovaMart IMS
        </h1>

      </div>

      {/* SIDEBAR CONTENT */}

      <div className="p-4">

        {/* MAIN */}

        <p className="text-xs text-gray-400 uppercase mb-4">
          Main
        </p>

        <div className="space-y-2">

          {/* DASHBOARD */}

          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard")}`}
          >

            <FaChartPie />
            Dashboard

          </Link>

          {/* PRODUCTS */}

          <Link
            to="/dashboard/products"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/products")}`}
          >

            <FaBoxOpen />
            Products

          </Link>

          {/* ANALYTICS */}

          <Link
            to="/dashboard/analytics"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/analytics")}`}
          >

            <FaChartBar />
            Analytics

          </Link>

        </div>

        {/* OPERATIONS */}

        <p className="text-xs text-gray-400 uppercase my-6">
          Operations
        </p>

        <div className="space-y-2">

          {/* RECEIVING */}

          <Link
            to="/dashboard/receiving"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/receiving")}`}
          >

            <FaTruck />
            Receiving

          </Link>

          {/* PURCHASE ORDERS */}

          <Link
            to="/dashboard/purchase-orders"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/purchase-orders")}`}
          >

            <FaFileInvoice />
            Purchase Orders

          </Link>

          {/* WAREHOUSE */}

          <Link
            to="/dashboard/warehouse"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/warehouse")}`}
          >

            <FaWarehouse />
            Warehouse

          </Link>

        </div>

        {/* ADMIN */}

        <p className="text-xs text-gray-400 uppercase my-6">
          Admin
        </p>

        <div className="space-y-2">

          {/* USERS */}

          <Link
            to="/dashboard/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/users")}`}
          >

            <FaUsers />
            Users

          </Link>

          {/* SETTINGS */}

          <Link
            to="/dashboard/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${active("/dashboard/settings")}`}
          >

            <FaCog />
            Settings

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;