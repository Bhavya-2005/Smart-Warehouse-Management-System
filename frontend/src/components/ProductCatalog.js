import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaSearch,
  FaPlus,
  FaDownload,
  FaUpload,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function ProductCatalog() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    product_name: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });


  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "https://smart-inventory-backend.onrender.coms/api/products/all"
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    fetchProducts();

  }, []);


  // STATUS LOGIC
  const getStatus = (quantity) => {

    if (quantity === 0) {
      return "Out of Stock";
    }

    if (quantity < 5) {
      return "Low Stock";
    }

    return "In Stock";
  };


  // HANDLE FORM CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // ADD PRODUCT
  const addProduct = async () => {

    try {

      await axios.post(
        "https://smart-inventory-backend.onrender.coms/api/products/add",
        formData
      );

      setShowModal(false);

      setFormData({
        product_name: "",
        category: "",
        quantity: "",
        price: "",
        supplier: "",
      });

      fetchProducts();

    } catch (error) {

      console.log(error);

    }
  };


  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `https://smart-inventory-backend.onrender.coms/api/products/delete/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }
  };


  // OPEN EDIT
  const openEdit = (product) => {

    setEditingId(product.id);

    setFormData({
      product_name: product.product_name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      supplier: product.supplier,
    });

    setShowModal(true);
  };


  // UPDATE PRODUCT
  const updateProduct = async () => {

    try {

      await axios.put(
        `https://smart-inventory-backend.onrender.coms/api/products/update/${editingId}`,
        formData
      );

      setShowModal(false);

      setEditingId(null);

      fetchProducts();

    } catch (error) {

      console.log(error);

    }
  };


  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.product_name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    const status = getStatus(product.quantity);

    const matchesStatus =
      statusFilter === "All" ||
      status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });


  // EXPORT CSV
  const exportCSV = () => {

    const headers = [
      "Product",
      "Category",
      "Quantity",
      "Price",
      "Supplier",
    ];

    const rows = filteredProducts.map((p) => [
      p.product_name,
      p.category,
      p.quantity,
      p.price,
      p.supplier,
    ]);

    let csvContent =
      headers.join(",") + "\n" +
      rows.map((e) => e.join(",")).join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "products.csv"
    );

    document.body.appendChild(link);

    link.click();
  };


  return (

    <div className="p-6 bg-[#F2F8FD] min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Product Catalog
          </h1>

          <p className="text-gray-500 mt-2">
            Real-Time Inventory Management
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={exportCSV}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-blue-50"
          >

            <FaDownload />
            Export

          </button>

          <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-blue-50">

            <FaUpload />
            Import

          </button>

          <button
            onClick={() => {
              setEditingId(null);
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 font-semibold hover:bg-blue-700 shadow-md"
          >

            <FaPlus />
            Add Product

          </button>

        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white rounded-2xl border p-5 mt-8 flex gap-4 items-center shadow-sm">

        <div className="flex-1 relative">

          <FaSearch className="absolute top-4 left-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search by product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none"
        >

          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Dairy">Dairy</option>
          <option value="Electronics">Electronics</option>

        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none"
        >

          <option value="All">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>

        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border mt-8 overflow-hidden shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-gray-500 text-sm">

              <th className="p-5">Product</th>
              <th className="p-5">Category</th>
              <th className="p-5">Stock</th>
              <th className="p-5">Status</th>
              <th className="p-5">Price</th>
              <th className="p-5">Supplier</th>
              <th className="p-5">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => {

              const status = getStatus(product.quantity);

              return (

                <tr
                  key={product.id}
                  className="border-t hover:bg-blue-50 transition"
                >

                  <td className="p-5 font-semibold text-gray-800">
                    {product.product_name}
                  </td>

                  <td className="p-5">
                    {product.category}
                  </td>

                  <td className="p-5 font-semibold">
                    {product.quantity}
                  </td>

                  <td className="p-5">

                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {status}

                    </span>

                  </td>

                  <td className="p-5 font-bold text-gray-800">
                    ₹{product.price}
                  </td>

                  <td className="p-5">
                    {product.supplier}
                  </td>

                  <td className="p-5">

                    <div className="flex gap-2">

                      <button
                        onClick={() => openEdit(product)}
                        className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-gray-100"
                      >

                        <FaEdit />

                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-red-100 text-red-500"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-[500px] rounded-3xl p-8">

            <h1 className="text-3xl font-bold mb-6">

              {editingId
                ? "Edit Product"
                : "Add Product"}

            </h1>

            <div className="space-y-4">

              <input
                type="text"
                name="product_name"
                placeholder="Product Name"
                value={formData.product_name}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

              <input
                type="text"
                name="supplier"
                placeholder="Supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="w-full border rounded-xl p-4"
              />

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={
                  editingId
                    ? updateProduct
                    : addProduct
                }
                className="bg-blue-600 text-white px-5 py-2 rounded-xl"
              >

                {editingId
                  ? "Update Product"
                  : "Save Product"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ProductCatalog;