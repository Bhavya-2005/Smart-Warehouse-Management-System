const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ====================================
// GET ALL PRODUCTS
// ====================================

router.get("/all", async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT *
      FROM products
      ORDER BY id DESC
      `
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});


// ====================================
// ADD PRODUCT
// ====================================

router.post("/add", async (req, res) => {

  try {

    const {
      product_name,
      category,
      quantity,
      price,
      supplier,
      sku,
      barcode
    } = req.body;

    await db.query(
      `
      INSERT INTO products
      (
        product_name,
        category,
        quantity,
        price,
        supplier,
        sku,
        barcode
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [
        product_name,
        category,
        quantity,
        price,
        supplier,
        sku,
        barcode
      ]
    );

    res.json({
      success: true,
      message: "Product Added Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});


// ====================================
// DELETE PRODUCT
// ====================================

router.delete("/delete/:id", async (req, res) => {

  try {

    await db.query(
      `
      DELETE FROM products
      WHERE id=$1
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});


// ====================================
// UPDATE PRODUCT
// ====================================

router.put("/update/:id", async (req, res) => {

  try {

    const {
      product_name,
      category,
      quantity,
      price,
      supplier,
      sku,
      barcode
    } = req.body;

    await db.query(
      `
      UPDATE products
      SET
        product_name=$1,
        category=$2,
        quantity=$3,
        price=$4,
        supplier=$5,
        sku=$6,
        barcode=$7
      WHERE id=$8
      `,
      [
        product_name,
        category,
        quantity,
        price,
        supplier,
        sku,
        barcode,
        req.params.id
      ]
    );

    res.json({
      success: true,
      message: "Product Updated Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});


// ====================================
// LOW STOCK PRODUCTS
// ====================================

router.get("/low-stock", async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT *
      FROM products
      WHERE quantity < threshold
      `
    );

    res.json(result.rows);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});


// ====================================
// KPI DATA
// ====================================

router.get("/kpi", async (req, res) => {

  try {

    const result = await db.query(
      `
      SELECT
        COUNT(*) AS totalproducts,
        SUM(quantity) AS totalstock,
        SUM(quantity * price) AS inventoryvalue
      FROM products
      `
    );

    res.json(result.rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;