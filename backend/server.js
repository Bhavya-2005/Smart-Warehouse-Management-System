const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const productRoutes = require('./routes/productRoutes');
const receivingRoutes = require("./routes/receivingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ROOT ROUTE
app.get('/', (req, res) => {
    res.send("API Running 🚀");
});

// PRODUCT ROUTES
app.use('/api/products', productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/receiving", receivingRoutes);
// START SERVER
app.listen(8081, () => {
    console.log("Server running on port 8081");
});