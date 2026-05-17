import KPICards from "../components/KPICards";
import Analytics from "../components/Analytics";
import Alerts from "../components/Alerts";
import ProductsTable from "../components/ProductsTable";

function DashboardHome() {

  return (

    <div className="p-6 bg-[#F2F8FD] min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-2xl font-bold text-gray-800">
            Good morning, Bhavya 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Warehouse Dashboard Overview
          </p>

        </div>

      </div>

      <KPICards />

      <div className="grid grid-cols-3 gap-5 mt-6">

        <div className="col-span-2">
          <Analytics />
        </div>

        <Alerts />

      </div>

      <div className="mt-6">
        <ProductsTable />
      </div>

    </div>

  );
}

export default DashboardHome;