const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const {
  authenticateJWT,
  authorizeRole,
} = require("../middlewares/authMiddleware");

router.get("/", authenticateJWT, ProductController.getAllProducts);
router.post(
  "/",
  authenticateJWT,
  authorizeRole(["admin"]),
  ProductController.createProduct
);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin"]),
  ProductController.updateProduct
);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin"]),
  ProductController.deleteProduct
);

module.exports = router;
