import { FaBell, FaCog } from "react-icons/fa";

function Topbar() {

  return (

    <div className="h-16 bg-blue-600 px-6 flex items-center justify-between">

      <div className="text-white font-semibold text-lg">
        Inventory Management System
      </div>

      <div className="flex items-center gap-5 text-white">

        <FaBell className="cursor-pointer" />

        <FaCog className="cursor-pointer" />

        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
          B
        </div>

      </div>

    </div>
  );
}

export default Topbar;