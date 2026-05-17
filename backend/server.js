require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const productRoutes = require("./routes/productRoutes");
const receivingRoutes = require("./routes/receivingRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// ROOT
app.get("/", (req, res) => {

  res.send("API Running 🚀");

});


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/receiving", receivingRoutes);


// PORT
const PORT =
  process.env.PORT || 8081;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});