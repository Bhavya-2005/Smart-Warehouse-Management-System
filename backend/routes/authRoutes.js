const express = require("express");

const router = express.Router();

const db = require("../config/db");


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    const existingUser =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE email=$1
        `,
        [email]
      );


    if (
      existingUser.rows.length > 0
    ) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    await db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password
      )
      VALUES ($1, $2, $3)
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


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    const result =
      await db.query(
        `
        SELECT *
        FROM users
        WHERE email=$1
        AND password=$2
        `,
        [
          email,
          password
        ]
      );


    if (
      result.rows.length === 0
    ) {

      return res.status(401).json({
        message: "Invalid Credentials"
      });

    }


    res.json({
      success: true,
      user: result.rows[0]
    });

  } catch (err) {

    console.log(err);

    res.status(500).json(err);

  }

});

module.exports = router;