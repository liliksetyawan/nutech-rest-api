const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const authenticate_token = require("../middlewares/authenticateToken")
const fileUpload = require("../middlewares/fileUpload");
const {validateUser} = require("../validations/userValidation");

router.route("/register").post(validateUser,  user_controller.register);
router.route("/login").post(user_controller.login);
router.route("/profile").get(authenticate_token, user_controller.profileUser);
router.route("/profile/update").put(authenticate_token, user_controller.updateUser);
router.route("/profile/image").put(authenticate_token, fileUpload.single('image'), user_controller.updateImage);

module.exports = router;