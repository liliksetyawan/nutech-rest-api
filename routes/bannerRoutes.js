const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/bannerController");
const authenticate_token = require("../middlewares/authenticateToken")

router.route("/banner").get(authenticate_token, bannerController.getAllBanner);

module.exports = router;