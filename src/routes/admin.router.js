const express = require('express');

const router = express.Router();

const controller = require('../controllers/admin.controller');

router.route('/').get(controller.getAll);
router.route('/:id').get(controller.getOne);

module.exports = router;