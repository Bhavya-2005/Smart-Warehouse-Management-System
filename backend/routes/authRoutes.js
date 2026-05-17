const express = require("express");

const router = express.Router();

const db = require("../config/db");



// ====================================
// REGISTER
// ====================================

router.post("/register", async (req, res) => {

  try {

    const {

      name,
      email,
      password

    } = req.body;



    // CHECK EXISTING USER
    const [existingUsers] =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE email=?
        `,
        [email]
      );



    if (existingUsers.length > 0) {

      return res.status(400).json({
        message: "User already exists"
      });

    }



    // INSERT USER
    await db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password
      )
      VALUES (?, ?, ?)
      `,
      [
        name,
        email,
        password
      ]
    );



    res.json({
      success: true,
      message: "Registered Successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});



// ====================================
// LOGIN
// ====================================

router.post("/login", async (req, res) => {

  try {

    const {

      email,
      password

    } = req.body;



    const [rows] =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE email=? AND password=?
        `,
        [
          email,
          password
        ]
      );



    if (rows.length === 0) {

      return res.status(401).json({
        message: "Invalid Credentials"
      });

    }



    res.json({
      success: true,
      user: rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});



module.exports = router;