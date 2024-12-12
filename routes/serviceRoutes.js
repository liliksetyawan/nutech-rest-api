const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const authenticate_token = require("../middlewares/authenticateToken")

router.route("/service").get(authenticate_token, serviceController.getAllService);

module.exports = router;