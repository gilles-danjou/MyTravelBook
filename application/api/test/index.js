'use strict';
var express = require('express');
var controller = require('./test.controller');

var router = express.Router();

router.get      ('/'        , controller.index);
//router.get      ('/'        , controller.me);
//router.get      ('/:test_id'  , controller.show);
//router.post     ('/'        , controller.create);
//router.put      ('/:test_id'  , controller.update);
//router.patch    ('/:test_id'  , controller.update);
//router.delete   ('/:test_id'  , controller.destroy);

module.exports = router;
