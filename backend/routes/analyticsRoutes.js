const express = require("express");

const router = express.Router();

const db = require("../config/db");



// ====================================
// GET ANALYTICS
// ====================================

router.get("/", async (req, res) => {

  try {

    const [products] =
      await db.query(
        `
        SELECT COUNT(*) AS totalProducts
        FROM products
        `
      );



    const [lowStock] =
      await db.query(
        `
        SELECT COUNT(*) AS lowStock
        FROM products
        WHERE quantity < threshold
        `
      );



    const [stock] =
      await db.query(
        `
        SELECT SUM(quantity) AS totalStock
        FROM products
        `
      );



    const [inventoryValue] =
      await db.query(
        `
        SELECT
        SUM(quantity * price)
        AS inventoryValue
        FROM products
        `
      );



    res.json({

      totalProducts:
        products[0].totalProducts,

      lowStock:
        lowStock[0].lowStock,

      totalStock:
        stock[0].totalStock || 0,

      inventoryValue:
        inventoryValue[0]
          .inventoryValue || 0,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});



module.exports = router;