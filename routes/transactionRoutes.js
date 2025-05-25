const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// GET home page
router.get('/', transactionController.getHome);

// POST add transaction
router.post('/add', transactionController.addTransaction);

// POST delete transaction
router.post('/delete/:id', transactionController.deleteTransaction);

module.exports = router;
