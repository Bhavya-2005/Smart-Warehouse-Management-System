const db = require("../config/db");


// ====================================
// GET ALL SHIPMENTS
// ====================================

exports.getShipments = async (req, res) => {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM receiving_shipments
      ORDER BY created_at DESC
      `
    );

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// CREATE SHIPMENT
// ====================================

exports.createShipment = async (req, res) => {

  try {

    const {

      asn,
      supplier_name,
      total_items,
      dock,
      store_number,
      arrival_time

    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO receiving_shipments
      (
        asn,
        supplier_name,
        total_items,
        received_items,
        status,
        dock,
        store_number,
        arrival_time
      )
      VALUES (?, ?, ?, 0, 'In Progress', ?, ?, ?)
      `,
      [
        asn,
        supplier_name,
        total_items,
        dock,
        store_number,
        arrival_time
      ]
    );

    const [rows] = await db.query(
      `
      SELECT *
      FROM receiving_shipments
      WHERE id=?
      `,
      [result.insertId]
    );

    res.json(rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// GET SHIPMENT ITEMS
// ====================================

exports.getShipmentItems = async (req, res) => {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM receiving_items
      WHERE shipment_id=?
      `,
      [req.params.id]
    );

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// ADD ITEM
// ====================================

exports.addItem = async (req, res) => {

  try {

    const {

      shipment_id,
      product_name,
      sku,
      barcode,
      expected_qty

    } = req.body;

    const [result] = await db.query(
      `
      INSERT INTO receiving_items
      (
        shipment_id,
        product_name,
        sku,
        barcode,
        expected_qty,
        received_qty,
        damaged_qty
      )
      VALUES (?, ?, ?, ?, ?, 0, 0)
      `,
      [
        shipment_id,
        product_name,
        sku,
        barcode,
        expected_qty
      ]
    );

    const [rows] = await db.query(
      `
      SELECT *
      FROM receiving_items
      WHERE id=?
      `,
      [result.insertId]
    );

    res.json(rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// RECEIVE ITEM
// ====================================

exports.receiveItem = async (req, res) => {

  try {

    const {

      received_qty,
      damaged_qty

    } = req.body;

    const [itemRows] = await db.query(
      `
      SELECT *
      FROM receiving_items
      WHERE id=?
      `,
      [req.params.id]
    );

    if (itemRows.length === 0) {

      return res.status(404).json({
        message: "Item not found"
      });

    }

    const item = itemRows[0];

    await db.query(
      `
      UPDATE receiving_items
      SET
        received_qty=?,
        damaged_qty=?
      WHERE id=?
      `,
      [
        received_qty,
        damaged_qty,
        req.params.id
      ]
    );

    const totalGoodQty =
      Number(received_qty) -
      Number(damaged_qty);

    await db.query(
      `
      UPDATE products
      SET quantity =
        quantity + ?
      WHERE sku=?
      `,
      [
        totalGoodQty,
        item.sku
      ]
    );

    const [productRows] = await db.query(
      `
      SELECT id
      FROM products
      WHERE sku=?
      `,
      [item.sku]
    );

    if (productRows.length > 0) {

      await db.query(
        `
        INSERT INTO inventory_movements
        (
          product_id,
          movement_type,
          quantity,
          reference_type,
          reference_id
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          productRows[0].id,
          "IN",
          totalGoodQty,
          "RECEIVING",
          item.shipment_id
        ]
      );

    }

    res.json({
      success: true,
      message:
        "Item updated successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// DELETE ITEM
// ====================================

exports.deleteItem = async (req, res) => {

  try {

    await db.query(
      `
      DELETE FROM receiving_items
      WHERE id=?
      `,
      [req.params.id]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// LOOKUP PRODUCT
// ====================================

exports.lookupProduct = async (req, res) => {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM receiving_items
      WHERE sku=? OR barcode=?
      `,
      [
        req.params.sku,
        req.params.sku
      ]
    );

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// AUTO SCAN ITEM
// ====================================

exports.scanItem = async (req, res) => {

  try {

    const { barcode } = req.body;

    const [rows] = await db.query(
      `
      SELECT *
      FROM receiving_items
      WHERE sku=? OR barcode=?
      `,
      [barcode, barcode]
    );

    if (rows.length === 0) {

      return res.status(404).json({
        message: "Item not found"
      });

    }

    const item = rows[0];

    const updatedQty =
      Number(item.received_qty) + 1;

    await db.query(
      `
      UPDATE receiving_items
      SET received_qty=?
      WHERE id=?
      `,
      [
        updatedQty,
        item.id
      ]
    );

    await db.query(
      `
      UPDATE receiving_shipments
      SET received_items =
        received_items + 1
      WHERE id=?
      `,
      [item.shipment_id]
    );

    const [updatedRows] =
      await db.query(
        `
        SELECT *
        FROM receiving_items
        WHERE id=?
        `,
        [item.id]
      );

    res.json(updatedRows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// CREATE DISCREPANCY
// ====================================

exports.createDiscrepancy = async (req, res) => {

  try {

    const {

      shipment_id,
      issue_type,
      description

    } = req.body;

    await db.query(
      `
      INSERT INTO discrepancies
      (
        shipment_id,
        issue_type,
        description
      )
      VALUES (?, ?, ?)
      `,
      [
        shipment_id,
        issue_type,
        description
      ]
    );

    res.json({
      success: true,
      message:
        "Discrepancy created"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// GET DISCREPANCIES
// ====================================

exports.getDiscrepancies = async (req, res) => {

  try {

    const [rows] = await db.query(
      `
      SELECT *
      FROM discrepancies
      ORDER BY created_at DESC
      `
    );

    res.json(rows);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};


// ====================================
// CLOSE SHIPMENT
// ====================================

exports.closeShipment = async (req, res) => {

  try {

    await db.query(
      `
      UPDATE receiving_shipments
      SET status='Complete'
      WHERE id=?
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message:
        "Shipment Closed"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

};