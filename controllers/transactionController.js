const transactionModel = require("../models/transactionModel")
const moment = require("moment")
const getAllTransaction = async(req,res) => {
     try {
        const { filter } = req.body;
        const transactions = await transactionModel.find({
            date:{
                $gt: moment().subtract(Number(filter), "d").toDate(),
            },
            userid: req.body.userid,
        });
        res.status(200).json(transactions);
     } catch (error) {
        console.log(error);
        res.status(500).json(error);
     }
}

const addTransaction = async(req,res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();

        res.status(201).send("Transaction Added");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const editTransaction = async(req,res) => {
    try {
        await transactionModel.findByIdAndUpdate({_id: req.body.transactionId},
                req.body.payload  
            );
            res.status(200).send("Edit successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {getAllTransaction, addTransaction, editTransaction}