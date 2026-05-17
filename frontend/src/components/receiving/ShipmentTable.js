import {
  useEffect,
  useState,
  useCallback
} from "react";

function ShipmentTable({

  shipments,
  refreshKey,
  refreshData

}) {

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [newItem, setNewItem] =
    useState({

      product_name: "",
      sku: "",
      expected_qty: "",

    });


  // ====================================
  // FETCH ITEMS
  // ====================================

  const fetchItems =
    useCallback(async () => {

      try {

        if (
          shipments.length === 0
        ) {

          setItems([]);

          return;

        }

        const shipmentId =
          Number(
            shipments[0].id
          );

        const response =
          await fetch(
            `http://localhost:8081/api/receiving/shipments/${shipmentId}/items`
          );

        const data =
          await response.json();

        setItems(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (err) {

        console.log(err);

      }

    }, [shipments]);


  // ====================================
  // LOAD ITEMS
  // ====================================

  useEffect(() => {

    fetchItems();

  }, [fetchItems, refreshKey]);


  // ====================================
  // ADD ITEM
  // ====================================

  const handleAddItem =
    async () => {

      try {

        if (
          shipments.length === 0
        ) {

          alert(
            "Create shipment first"
          );

          return;

        }

        if (

          !newItem.product_name ||

          !newItem.sku ||

          !newItem.expected_qty

        ) {

          alert(
            "Fill all fields"
          );

          return;

        }

        setLoading(true);

        await fetch(
          "http://localhost:8081/api/receiving/add-item",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              shipment_id:
                Number(
                  shipments[0].id
                ),

              product_name:
                newItem.product_name,

              sku:
                newItem.sku,

              barcode:
                newItem.sku,

              expected_qty:
                Number(
                  newItem.expected_qty
                ),

            }),
          }
        );

        // CLEAR FORM

        setNewItem({

          product_name: "",
          sku: "",
          expected_qty: "",

        });

        // REFRESH

        await fetchItems();

        if (refreshData) {

          refreshData();

        }

        alert(
          "Item Added"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to add item"
        );

      } finally {

        setLoading(false);

      }

    };


  // ====================================
  // HANDLE INPUT CHANGE
  // ====================================

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...items];

    updated[index] = {

      ...updated[index],

      [field]: value

    };

    setItems(updated);

  };


  // ====================================
  // SAVE ITEM
  // ====================================

  const handleSave =
    async (item) => {

      try {

        setLoading(true);

        await fetch(
          `http://localhost:8081/api/receiving/receive-item/${item.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              received_qty:
                Number(
                  item.received_qty
                ),

              damaged_qty:
                Number(
                  item.damaged_qty
                ),

            }),
          }
        );

        await fetchItems();

        if (refreshData) {

          refreshData();

        }

        alert(
          "Item Updated"
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to update item"
        );

      } finally {

        setLoading(false);

      }

    };


  // ====================================
  // DELETE ITEM
  // ====================================

  const handleDelete =
    async (id) => {

      try {

        await fetch(
          `http://localhost:8081/api/receiving/item/${id}`,
          {
            method: "DELETE",
          }
        );

        await fetchItems();

        if (refreshData) {

          refreshData();

        }

      } catch (err) {

        console.log(err);

      }

    };


  // ====================================
  // TOTALS
  // ====================================

  const totalExpected =
    items.reduce(
      (acc, item) =>
        acc +
        Number(
          item.expected_qty || 0
        ),
      0
    );

  const totalReceived =
    items.reduce(
      (acc, item) =>
        acc +
        Number(
          item.received_qty || 0
        ),
      0
    );

  const totalDamaged =
    items.reduce(
      (acc, item) =>
        acc +
        Number(
          item.damaged_qty || 0
        ),
      0
    );


  return (

    <div className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
    ">

      {/* HEADER */}

      <div className="
        flex
        justify-between
        items-center
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
          ">
            Receiving Items
          </h2>

          <p className="
            text-gray-500
            mt-2
          ">
            Edit quantities and update stock instantly
          </p>

        </div>

      </div>


      {/* ADD ITEM FORM */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-4
        mt-6
      ">

        <input
          type="text"
          placeholder="Product Name"
          value={
            newItem.product_name
          }
          onChange={(e) =>
            setNewItem({

              ...newItem,

              product_name:
                e.target.value,

            })
          }
          className="
            border
            p-3
            rounded-2xl
          "
        />

        <input
          type="text"
          placeholder="SKU"
          value={newItem.sku}
          onChange={(e) =>
            setNewItem({

              ...newItem,

              sku:
                e.target.value,

            })
          }
          className="
            border
            p-3
            rounded-2xl
          "
        />

        <input
          type="number"
          placeholder="Expected Qty"
          value={
            newItem.expected_qty
          }
          onChange={(e) =>
            setNewItem({

              ...newItem,

              expected_qty:
                e.target.value,

            })
          }
          className="
            border
            p-3
            rounded-2xl
          "
        />

        <button
          disabled={loading}
          onClick={handleAddItem}
          className="
            bg-black
            text-white
            rounded-2xl
            px-5
            py-3
          "
        >

          {
            loading
              ? "Adding..."
              : "Add Item"
          }

        </button>

      </div>


      {/* TABLE */}

      <div className="
        overflow-x-auto
        mt-8
      ">

        <table className="w-full">

          <thead>

            <tr className="
              border-b
              text-left
            ">

              <th className="pb-4">
                SKU
              </th>

              <th className="pb-4">
                Product
              </th>

              <th className="pb-4">
                Expected
              </th>

              <th className="pb-4">
                Received
              </th>

              <th className="pb-4">
                Damaged
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Actions
              </th>

            </tr>

          </thead>


          <tbody>

            {
              items.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="
                      py-10
                      text-center
                      text-gray-500
                    "
                  >
                    No items added
                  </td>

                </tr>

              ) : (

                items.map((
                  item,
                  index
                ) => (

                  <tr
                    key={item.id}
                    className="
                      border-b
                    "
                  >

                    <td className="
                      py-5
                      font-semibold
                    ">
                      {item.sku}
                    </td>

                    <td className="py-5">
                      {
                        item.product_name
                      }
                    </td>

                    <td className="py-5">
                      {
                        item.expected_qty
                      }
                    </td>


                    {/* RECEIVED */}

                    <td className="py-5">

                      <input
                        type="number"
                        value={
                          item.received_qty
                        }
                        onChange={(e) =>
                          handleChange(

                            index,

                            "received_qty",

                            e.target.value

                          )
                        }
                        className="
                          border
                          rounded-xl
                          px-3
                          py-2
                          w-24
                        "
                      />

                    </td>


                    {/* DAMAGED */}

                    <td className="py-5">

                      <input
                        type="number"
                        value={
                          item.damaged_qty
                        }
                        onChange={(e) =>
                          handleChange(

                            index,

                            "damaged_qty",

                            e.target.value

                          )
                        }
                        className="
                          border
                          rounded-xl
                          px-3
                          py-2
                          w-24
                        "
                      />

                    </td>


                    {/* STATUS */}

                    <td className="py-5">

                      {
                        Number(
                          item.received_qty
                        ) >=
                        Number(
                          item.expected_qty
                        ) ? (

                          <span className="
                            bg-green-100
                            text-green-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                          ">
                            Received
                          </span>

                        ) : (

                          <span className="
                            bg-yellow-100
                            text-yellow-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                          ">
                            Not Received
                          </span>

                        )
                      }

                    </td>


                    {/* ACTIONS */}

                    <td className="py-5">

                      <div className="
                        flex
                        gap-3
                      ">

                        <button
                          onClick={() =>
                            handleSave(item)
                          }
                          className="
                            bg-blue-600
                            text-white
                            px-4
                            py-2
                            rounded-xl
                          "
                        >
                          Save
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id
                            )
                          }
                          className="
                            bg-red-100
                            text-red-600
                            px-4
                            py-2
                            rounded-xl
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )
            }

          </tbody>

        </table>

      </div>


      {/* TOTALS */}

      <div className="
        flex
        gap-8
        mt-8
        font-semibold
        flex-wrap
      ">

        <div>
          Total Expected:
          {" "}
          {totalExpected}
        </div>

        <div className="
          text-blue-600
        ">
          Total Received:
          {" "}
          {totalReceived}
        </div>

        <div className="
          text-red-600
        ">
          Total Damaged:
          {" "}
          {totalDamaged}
        </div>

      </div>

    </div>
  );
}

export default ShipmentTable;