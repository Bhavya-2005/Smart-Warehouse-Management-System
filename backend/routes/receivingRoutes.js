const express = require("express");

const router = express.Router();

const controller = require(
  "../controllers/receivingController"
);


// ====================================
// SHIPMENTS
// ====================================

router.get(
  "/shipments",
  controller.getShipments
);

router.post(
  "/shipments",
  controller.createShipment
);

router.get(
  "/shipments/:id/items",
  controller.getShipmentItems
);

router.put(
  "/close/:id",
  controller.closeShipment
);


// ====================================
// ITEMS
// ====================================

router.post(
  "/add-item",
  controller.addItem
);

router.put(
  "/receive-item/:id",
  controller.receiveItem
);

router.delete(
  "/item/:id",
  controller.deleteItem
);

router.get(
  "/lookup/:sku",
  controller.lookupProduct
);

router.post(
  "/scan",
  controller.scanItem
);


// ====================================
// DISCREPANCIES
// ====================================

router.post(
  "/discrepancies",
  controller.createDiscrepancy
);

router.get(
  "/discrepancies",
  controller.getDiscrepancies
);

module.exports = router;