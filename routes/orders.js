const express = require("express");
const router = express.Router();
const OrdersSchema = require("./../models/orders_schema");
const jwt = require("jsonwebtoken");

router.get("/all", async (req, res) => {
  try {
    const all = await OrdersSchema.find();
    res.json({ all });
  } catch (error) {
    res.status(400).json({ message: error, status: "rrror" });
  }
});

//Get all order_detail
router.get("/my", async (req, res) => {
  try {
    const token =
      req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

    if (token === undefined || token === null || token === "") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const order = await OrdersSchema.find({ user_id: decoded.id }).populate([
      {
        path: "products.product_id",
      },
    ]);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Get my orders
router.get("/myorders", async (req, res) => {
  //Check user have token or not
  const token =
    req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const order = await OrdersSchema.find({ user_id: decoded.id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//post a order_detail
router.post("/", async (req, res) => {
  //Check user have token or not
  const token =
    req.cookies.auth_token || req.body.token || req.headers["x-auth-token"];

  if (token === undefined || token === null || token === "") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const order = new OrdersSchema({
      user_id: decoded.id,
      address_id: req.body.address_id,
      products: JSON.parse(req.body.products),
      amount: req.body.amount,
      status: "active",
    });
    await order.save();
    res
      .status(201)
      .json({ message: "Order created successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//code to get a order by id
router.get("/:id", async (req, res) => {
  try {
    const order = await OrdersSchema.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

// code to update status of order by id
router.put("/updatestatus/:id", async (req, res) => {
  try {
    const order = await OrdersSchema.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res
      .status(200)
      .json({ message: "Order updated successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});

//Delete One order_detail
router.delete("/:id", async (req, res) => {
  try {
    const order = await OrdersSchema.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Order deleted successfully", status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: "error" });
  }
});
module.exports = router;
