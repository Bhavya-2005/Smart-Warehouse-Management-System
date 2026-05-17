import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import DashboardHome from "./DashboardHome";
import Products from "./Products";
import AnalyticsPage from "./Analytics";
import Receiving from "./Receiving";
import Warehouse from "./Warehouse";
import PurchaseOrders from "./PurchaseOrders";

function Dashboard() {

  return (

    <div className="flex min-h-screen bg-[#F2F8FD]">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <Routes>

          <Route
            path="/"
            element={<DashboardHome />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/analytics"
            element={<AnalyticsPage />}
          />

          <Route
            path="/receiving"
            element={<Receiving />}
          />

          <Route
            path="/warehouse"
            element={<Warehouse />}
          />

          <Route
            path="/purchase-orders"
            element={<PurchaseOrders />}
          />

        </Routes>

      </div>

    </div>

  );
}

export default Dashboard;