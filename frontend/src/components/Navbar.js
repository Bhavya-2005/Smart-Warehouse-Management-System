import { FaSearch, FaBell } from "react-icons/fa";

function Navbar() {

  return (

    <div className="bg-white h-24 shadow-sm flex items-center justify-between px-10 rounded-xl">

      <h1 className="text-3xl font-bold text-gray-800">
        Inventory Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <FaSearch size={22} className="text-gray-500" />
        <FaBell size={22} className="text-gray-500" />

        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <div>
            <p className="font-semibold">Bhavya</p>
            <p className="text-sm text-gray-500">
              Admin
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;