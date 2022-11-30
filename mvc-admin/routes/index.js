const express = require('express');
const router = express.Router();

const cusController = require('../components/products/mainPageController');


router.get('/', cusController.get_HomePage);

router.get('/:page', cusController.get_Page);
module.exports = router;