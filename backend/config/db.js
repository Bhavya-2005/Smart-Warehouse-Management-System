const mysql = require("mysql2/promise");

const db = mysql.createPool({

  host: "localhost",

  user: "root",

  password: "Bhavya@2129",

  database: "inventory_db",

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0

});



// TEST CONNECTION
(async () => {

  try {

    const connection = await db.getConnection();

    console.log("MySQL Connected ✅");

    connection.release();

  } catch (err) {

    console.log(err);

  }

})();



module.exports = db;