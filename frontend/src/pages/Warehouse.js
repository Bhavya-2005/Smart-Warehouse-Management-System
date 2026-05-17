import WarehouseHeader from "../components/warehouse/WarehouseHeader";
import WarehouseKPIs from "../components/warehouse/WarehouseKPIs";
import WarehouseTabs from "../components/warehouse/WarehouseTabs";
import FloorMap from "../components/warehouse/FloorMap";
import BinDetails from "../components/warehouse/BinDetails";
import ZoneCapacity from "../components/warehouse/ZoneCapacity";
import BinLocationsTable from "../components/warehouse/BinLocationsTable";

function Warehouse() {

  return (

    <div className="p-6 bg-[#F2F8FD] min-h-screen">

      <WarehouseHeader />

      <WarehouseKPIs />

      <WarehouseTabs />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

        <div className="xl:col-span-2">

          <FloorMap />

        </div>

        <div className="space-y-6">

          <BinDetails />

          <ZoneCapacity />

        </div>

      </div>

      <div className="mt-6">

        <BinLocationsTable />

      </div>

    </div>
  );
}

export default Warehouse;