const express = require('express')
const router = express.Router()

// Controller

// Middlewares
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation  } = require("../middlewares/photoValidation");
const authGuard = require('../middlewares/authGuard');

// Routes


module.exports = router;