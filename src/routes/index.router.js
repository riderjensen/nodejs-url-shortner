const express = require('express');

const router = express.Router();

const controller = require('../controllers/index.controller');

router.route('/').get(controller.getIndex);
router.route('/:id').get(controller.forwardRequest);

module.exports = router;