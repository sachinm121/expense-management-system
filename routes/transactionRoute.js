const express = require("express");
const { addTransaction, getAllTransaction, editTransaction } = require("../controllers/transactionController");

//router object
const router = express.Router();

//Routers
// add transaction POST method 
router.post("/add-transaction", addTransaction);

// edit transaction POST method 
router.post("/edit-transaction", editTransaction);

//get transaction GET method
router.post("/get-transaction", getAllTransaction); 

module.exports = router;