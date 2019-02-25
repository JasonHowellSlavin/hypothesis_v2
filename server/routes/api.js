const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


/* GET home page. */
router.get('/', indexController.canned_response);

router.get('/search/url', indexController.url_only_search);

module.exports = router;
