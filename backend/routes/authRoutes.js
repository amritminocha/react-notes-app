const express = require('express');
require("dotenv").config();

const {validateSignUp, validateLogin} = require("../middleware/validateRequest");
const authService = require("../services/authService");
const router = express.Router();

router.post("/signup", validateSignUp, authService.signup);

router.post("/login", validateLogin, authService.login);

module.exports = router;