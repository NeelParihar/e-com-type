const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { sign } = require("jsonwebtoken");
const { compare, hash: _hash } = require("bcryptjs");
const config = require("../../config");
const authorize = require("../helpers/authenticate");

const getAllSellers = async (req, res) => {
  try {
    const sellers = await db.User.findAll({
      attributes: { exclude: ["password"] },
      where: { type: "seller", recordStatus: 1 },
    });

    res.json({
      message: "Sellers fetched successfully!",
      data: sellers,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getSellerCatalog = async (req, res) => {
  if (req.query && !req.params.seller_id) {
    res.status(400).send({
      message: "Please provide seller id",
    });
  }

  try {
    const catalog = await db.Catalog.findOne({
      where: { userId: req.params.seller_id, recordStatus: 1 },
    });

    res.json({
      message: "Seller Catalog fetched successfully!",
      data: catalog,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const createBuyerOrder = async (req, res) => {
  if (req.query && !req.params.seller_id) {
    res.status(400).send({
      message: "Please provide seller id",
    });
  }

  try {
    const catalog = await db.Catalog.findOne({
      where: { userId: req.params.seller_id, recordStatus: 1 },
    });

    if (!catalog) {
      res.status(400).send({
        message: "Catalog order not found",
      });
    }

    const order = await db.Order.create({
      orderSellerId: req.params.seller_id,
      userId: req.user.id,
      status: "created",
    });

    const orderItems = req.body.items.map((item) => {
      return {
        ...item,
        orderId: order.id,
      };
    });

    await db.OrderItem.bulkCreate(orderItems);

    res.json({
      message: "Order created successfully!",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// routes
router.get("/buyer/list-of-sellers", authorize, getAllSellers);
router.get("/buyer/seller-catalog/:seller_id", authorize, getSellerCatalog);
router.post("/buyer/create-order/:seller_id", authorize, createBuyerOrder);

module.exports = router;
