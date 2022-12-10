const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { sign } = require("jsonwebtoken");
const { compare, hash: _hash } = require("bcryptjs");
const config = require("../../config");

const registerUser = async (req, res) => {
  if (req.body && (!req.body.email || !req.body.password)) {
    res.status(400).send({
      message: "Please provide a email and password for USER",
    });
  }

  if (await db.User.findOne({ where: { email: req.body.email } })) {
    res.status(400).send({
      message: 'Email "' + req.body.email + '" is already taken',
    });
  }

  try {
    // hash password
    req.body.password = await _hash(req.body.password, 10);

    const user = await db.User.create(req.body);

    // create auth token
    const token = sign({ sub: user.id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    let userWithoutPass = user.get();
    delete userWithoutPass.password;

    res.json({
      message: "User created successfully!",
      data: { ...userWithoutPass, token },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  if (req.body && (!req.body.email || !req.body.password)) {
    res.status(400).send({
      message: "Please provide a email and password",
    });
  }

  try {
    const user = await db.User.findOne({ where: { email: req.body.email } });

    if (!user || !(await compare(req.body.password, user.password))) {
      res.status(400).send({
        message: "Email or password is incorrect",
      });
    }

    // authentication successful
    const token = sign({ sub: user.id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    let userWithoutPass = user.get();
    delete userWithoutPass.password;

    res.json({
      message: "User loggedin successfully!",
      data: { ...userWithoutPass, token },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// routes
router.post("/auth/register", registerUser);
router.post("/auth/login", login);

module.exports = router;
