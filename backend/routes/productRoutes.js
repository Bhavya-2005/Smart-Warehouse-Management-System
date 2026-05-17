const express = require("express");
const router = express.Router();

const db = require("../config/db");


// ====================================
// GET ALL PRODUCTS
// ====================================

router.get("/all", async (req, res) => {

  try {

    const [rows] = await db.query(
      "SELECT * FROM products"
    );

    res.json(rows);

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
    } = req.body;

    await db.query(
      `
      INSERT INTO products
      (
        product_name,
        category,
        quantity,
        price,
        supplier
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        product_name,
        category,
        quantity,
        price,
        supplier,
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
      WHERE id=?
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
    } = req.body;

    await db.query(
      `
      UPDATE products
      SET
        product_name=?,
        category=?,
        quantity=?,
        price=?,
        supplier=?
      WHERE id=?
      `,
      [
        product_name,
        category,
        quantity,
        price,
        supplier,
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

    const [rows] = await db.query(
      `
      SELECT *
      FROM products
      WHERE quantity < 5
      `
    );

    res.json(rows);

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

    const [rows] = await db.query(
      `
      SELECT
        COUNT(*) AS totalProducts,
        SUM(quantity) AS totalStock,
        SUM(quantity * price) AS inventoryValue
      FROM products
      `
    );

    res.json(rows[0]);

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});


module.exports = router;