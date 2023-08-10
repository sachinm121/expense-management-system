const express = require("express");
const { loginController, registerController } = require("../controllers/userController");

//router object
const router = express.Router();

//Routers
//POST || LOGIN
router.post("/login", loginController);

//POST || REGISTER
router.post("/register", registerController);

module.exports = router;