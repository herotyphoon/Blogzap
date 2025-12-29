const express = require('express');

const {handleRenderHomePage} = require('../controllers/root.controllers.js');

const router = express.Router();

router.get('/', handleRenderHomePage);

module.exports = router;