const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { sign } = require("jsonwebtoken");
const { compare, hash: _hash } = require("bcryptjs");
const config = require("../../config");
const authorize = require("../helpers/authenticate");

const createCatalog = async (req, res) => {

    if (req.body && (!req.body.sellerId || !req.body.items || !req.body.name)) {
        res.status(400).send({
          message: "Please provide catalog Info",
        });
      }

  try {
    const catalog = await db.Catalog.create({
      userId: req.body.sellerId,
      name: req.body.name
    });

    const products = req.body.items.map((item) => {
        return {
            ...item,
            catalogId: catalog.id
        }
    })

     await db.Product.bulkCreate(products);

    res.json({
      message: "Catalog created successfully!",
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getSellerOrders = async (req, res) => {

  if (req.query && (!req.params.sellerId)) {
    res.status(400).send({
      message: "Please provide seller id",
    });
  }

  try {
    const orders = await db.Order.findAll({
      where: { userId: req.params.sellerId, recordStatus: 1 },
    });

    res.json({
      message: "Seller Orders fetched successfully!",
      data: orders,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// routes
router.post("/seller/create-catalog", authorize, createCatalog);
router.get("/seller/orders/:sellerId", authorize, getSellerOrders);

module.exports = router;
