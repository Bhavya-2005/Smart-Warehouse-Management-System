const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ================= REGISTER =================
router.post("/register", async (req, res) => {

  try {

    console.log("REGISTER API HIT");

    console.log("REQ BODY:");
    console.log(req.body);


    const {
      full_name,
      email,
      password,
      role
    } = req.body;


    console.log("FULL NAME:", full_name);
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    console.log("ROLE:", role);


    // VALIDATION
    if (
      !full_name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });

    }


    // CHECK EXISTING USER
    const existingUser =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
      );


    if (
      existingUser.rows.length > 0
    ) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });

    }


    // INSERT USER
    const insertUser =
      await db.query(
        `
        INSERT INTO users
        (
          full_name,
          email,
          password,
          role
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
          full_name,
          email,
          password,
          role
        ]
      );


    console.log("USER INSERTED:");
    console.log(insertUser.rows[0]);


    res.json({
      success: true,
      message: "Registered Successfully",
      user: insertUser.rows[0]
    });

  } catch (err) {

    console.log("REGISTER ERROR:");
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });

  }

});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    console.log("LOGIN API HIT");

    console.log(req.body);


    const {
      email,
      password
    } = req.body;


    // VALIDATION
    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message: "Please enter email and password"
      });

    }


    // FIND USER
    const result =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        AND password = $2
        `,
        [
          email,
          password
        ]
      );


    // INVALID USER
    if (
      result.rows.length === 0
    ) {

      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });

    }


    console.log("LOGIN SUCCESS");


    res.json({
      success: true,
      message: "Login Successful",
      user: result.rows[0]
    });

  } catch (err) {

    console.log("LOGIN ERROR:");
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });

  }

});


module.exports = router;