require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const auditRoutes = require("./routes/auditRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Bind routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/audit", auditRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync();
});
