const express = require("express");

const cors = require("cors");

const productRoutes =
  require("./routes/productRoutes");

const authRoutes =
  require("./routes/authRoutes");

const analyticsRoutes =
  require("./routes/analyticsRoutes");

const receivingRoutes =
  require("./routes/receivingRoutes");

require("./config/db");

const app = express();



// ====================================
// MIDDLEWARE
// ====================================

app.use(cors());

app.use(express.json());



// ====================================
// ROOT
// ====================================

app.get("/", (req, res) => {

  res.send("API Running 🚀");

});



// ====================================
// ROUTES
// ====================================

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/receiving",
  receivingRoutes
);



// ====================================
// START SERVER
// ====================================

const PORT = 8081;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});