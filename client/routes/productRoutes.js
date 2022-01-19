// importing requirements
const express = require("express");

// grpc router
const grpcRoutes = require("./grpcRoutes");

// router config
const router = express.Router();

// routes (REST)
router.get("/products", grpcRoutes.listProducts);
router.get("/products/:id", grpcRoutes.readProduct);
router.post("/products", grpcRoutes.createProduct);
router.put("/products/:id", grpcRoutes.updateProduct);
router.delete("/products/:id", grpcRoutes.deleteProduct);

module.exports = router;