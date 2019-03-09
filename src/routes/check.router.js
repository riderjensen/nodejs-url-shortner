const express = require('express');

const router = express.Router();

const controller = require('../controllers/check.controller');

router.route('/:id').post(controller.checkID);

module.exports = router;