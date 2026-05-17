import { useEffect, useState } from "react";
import axios from "axios";

function ProductsTable() {

  const [products, setProducts] = useState([]);

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

  return (

    <div className="bg-white p-6 rounded-3xl shadow-sm">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          Products
        </h1>

      </div>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b">

            <th className="py-4">Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-b"
            >

              <td className="py-4">
                {product.product_name}
              </td>

              <td>
                {product.category}
              </td>

              <td>
                {product.quantity}
              </td>

              <td>
                ₹{product.price}
              </td>

              <td>
                {product.supplier}
              </td>

              <td>

                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductsTable;