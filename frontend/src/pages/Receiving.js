import {
  useEffect,
  useState
} from "react";

import ReceivingHeader from "../components/receiving/ReceivingHeader";
import ReceivingKPIs from "../components/receiving/ReceivingKPIs";
import ScanBar from "../components/receiving/ScanBar";
import ShipmentTable from "../components/receiving/ShipmentTable";
import ChecklistPanel from "../components/receiving/ChecklistPanel";
import DiscrepancyPanel from "../components/receiving/DiscrepancyPanel";
import ShipmentQueue from "../components/receiving/ShipmentQueue";

function Receiving() {

  // ====================================
  // SHIPMENTS
  // ====================================

  const [shipments, setShipments] =
    useState([]);

  const [selectedShipment, setSelectedShipment] =
    useState(null);

  const [refreshKey, setRefreshKey] =
    useState(0);

  // ====================================
  // CREATE SHIPMENT
  // ====================================

  const [asn, setAsn] =
    useState("");

  const [
    supplierName,
    setSupplierName
  ] = useState("");

  const [
    totalItems,
    setTotalItems
  ] = useState("");

  const [dock, setDock] =
    useState("");

  const [
    storeNumber,
    setStoreNumber
  ] = useState("");

  const [
    arrivalTime,
    setArrivalTime
  ] = useState("");


  // ====================================
  // DISCREPANCIES
  // ====================================

  const [
    discrepancies,
    setDiscrepancies
  ] = useState([]);

  const [
    shipmentId,
    setShipmentId
  ] = useState("");

  const [
    issueType,
    setIssueType
  ] = useState("");

  const [
    description,
    setDescription
  ] = useState("");


  // ====================================
  // BARCODE
  // ====================================

  const [
    lookupResult,
    setLookupResult
  ] = useState([]);

  const [barcode, setBarcode] =
    useState("");


  // ====================================
  // FETCH SHIPMENTS
  // ====================================

  const fetchShipments =
    async () => {

      try {

        const response =
          await fetch(
            "https://smart-inventory-backend-m3wf.onrender.com/api/receiving/shipments"
          );

        const data =
          await response.json();

        const shipmentData =
          Array.isArray(data)
            ? data
            : [];

        setShipments(
          shipmentData
        );

        if (
          shipmentData.length > 0
        ) {

          // KEEP CURRENT SELECTED
          if (selectedShipment) {

            const updatedShipment =
              shipmentData.find(
                (item) =>
                  item.id ===
                  selectedShipment.id
              );

            if (updatedShipment) {

              setSelectedShipment(
                updatedShipment
              );

            } else {

              setSelectedShipment(
                shipmentData[0]
              );

            }

          } else {

            setSelectedShipment(
              shipmentData[0]
            );

          }

        } else {

          setSelectedShipment(null);

        }

        return shipmentData;

      } catch (err) {

        console.log(err);

        return [];

      }

    };


  // ====================================
  // FETCH DISCREPANCIES
  // ====================================

  const fetchDiscrepancies =
    async () => {

      try {

        const response =
          await fetch(
            "https://smart-inventory-backend-m3wf.onrender.com/api/receiving/discrepancies"
          );

        const data =
          await response.json();

        const discrepancyData =
          Array.isArray(data)
            ? data
            : [];

        setDiscrepancies(
          discrepancyData
        );

        return discrepancyData;

      } catch (err) {

        console.log(err);

        return [];

      }

    };


  // ====================================
  // REFRESH ALL
  // ====================================

  const refreshAll =
    async () => {

      await fetchShipments();

      await fetchDiscrepancies();

      setRefreshKey(
        prev => prev + 1
      );

    };


  // ====================================
  // INITIAL LOAD
  // ====================================

  useEffect(() => {

    refreshAll();
    // eslint-disable-next-line

  }, []);


  // ====================================
  // CREATE SHIPMENT
  // ====================================

  const createShipment =
    async () => {

      try {

        if (
          !asn ||
          !supplierName
        ) {

          alert(
            "Fill shipment details"
          );

          return;

        }

        await fetch(
          "https://smart-inventory-backend-m3wf.onrender.com/api/receiving/shipments",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              asn,

              supplier_name:
                supplierName,

              total_items:
                Number(totalItems),

              dock,

              store_number:
                storeNumber,

              arrival_time:
                arrivalTime,

            }),
          }
        );

        // CLEAR FORM

        setAsn("");

        setSupplierName("");

        setTotalItems("");

        setDock("");

        setStoreNumber("");

        setArrivalTime("");

        // REFRESH

        await refreshAll();

        alert(
          "Shipment Created"
        );

      } catch (err) {

        console.log(err);

      }

    };


  // ====================================
  // CREATE DISCREPANCY
  // ====================================

  const createDiscrepancy =
    async () => {

      try {

        if (
          !shipmentId ||
          !issueType ||
          !description
        ) {

          alert(
            "Please fill all fields"
          );

          return;

        }

        await fetch(
          "https://smart-inventory-backend-m3wf.onrender.com/api/receiving/discrepancies",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              shipment_id:
                Number(shipmentId),

              issue_type:
                issueType,

              description,

            }),
          }
        );

        setShipmentId("");

        setIssueType("");

        setDescription("");

        // REFRESH

        await refreshAll();

        alert(
          "Discrepancy Created"
        );

      } catch (err) {

        console.log(err);

      }

    };


  return (

    <div className="
      p-6
      bg-[#F2F8FD]
      min-h-screen
    ">

      {/* HEADER */}

      <ReceivingHeader
        shipments={shipments}
        refreshShipments={refreshAll}
      />


      {/* CREATE SHIPMENT */}

      <div className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        mt-6
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            New Shipment
          </h2>

          <button
            onClick={createShipment}
            className="
              bg-black
              text-white
              px-5
              py-3
              rounded-2xl
            "
          >
            Create Shipment
          </button>

        </div>


        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        ">

          <input
            type="text"
            placeholder="ASN"
            value={asn}
            onChange={(e) =>
              setAsn(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded-2xl
            "
          />

          <input
            type="text"
            placeholder="Supplier Name"
            value={supplierName}
            onChange={(e) =>
              setSupplierName(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded-2xl
            "
          />

          <input
            type="number"
            placeholder="Total Items"
            value={totalItems}
            onChange={(e) =>
              setTotalItems(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded-2xl
            "
          />

          <input
            type="text"
            placeholder="Dock"
            value={dock}
            onChange={(e) =>
              setDock(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded-2xl
            "
          />

          <input
            type="text"
            placeholder="Store Number"
            value={storeNumber}
            onChange={(e) =>
              setStoreNumber(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded-2xl
            "
          />

          <input
            type="text"
            placeholder="Arrival Time"
            value={arrivalTime}
            onChange={(e) =>
              setArrivalTime(
                e.target.value
              )
            }
            className="
              border
              p-3
              rounded-2xl
            "
          />

        </div>

      </div>


      {/* KPI */}

      <ReceivingKPIs
        shipments={shipments}
        discrepancies={discrepancies}
      />


      {/* SCANNER */}

      <ScanBar

        barcode={barcode}
        setBarcode={setBarcode}

        lookupResult={lookupResult}
        setLookupResult={setLookupResult}

        refreshData={refreshAll}

      />


      {/* MAIN */}

      <div className="
        grid
        grid-cols-1
        xl:grid-cols-4
        gap-6
        mt-6
      ">

        {/* LEFT PANEL */}

        <div className="
          xl:col-span-1
        ">

          <ShipmentQueue

            shipments={shipments}

            selectedShipment={selectedShipment}

            setSelectedShipment={
              setSelectedShipment
            }

          />

        </div>


        {/* RIGHT PANEL */}

        <div className="
          xl:col-span-3
          space-y-6
        ">

          <ShipmentTable

            shipments={
              selectedShipment
                ? [selectedShipment]
                : []
            }

            refreshKey={refreshKey}

            refreshData={refreshAll}

          />

          <div className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          ">

            <ChecklistPanel />

            <DiscrepancyPanel

              discrepancies={discrepancies}

              shipmentId={shipmentId}
              setShipmentId={setShipmentId}

              issueType={issueType}
              setIssueType={setIssueType}

              description={description}
              setDescription={setDescription}

              createDiscrepancy={
                createDiscrepancy
              }

            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Receiving;