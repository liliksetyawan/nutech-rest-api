const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticate_token = require("../middlewares/authenticateToken")
const {validateTopup} = require("../validations/transactionValidation")

router.route("/balance").get(authenticate_token, transactionController.getBalance);
router.route("/topup").post(authenticate_token, validateTopup, transactionController.topUp);
router.route("/transaction").post(authenticate_token, transactionController.transaction);
router.route("/transaction/history").get(authenticate_token, transactionController.getTransactionPaginate);

module.exports = router;