'use strict';
var express = require('express');
var controller = require('./snipet.controller');

var router = express.Router();

router.get      ('/'        , controller.index);
//router.get      ('/:query'  , controller.show);
//router.post     ('/'        , controller.create);
//router.put      ('/:query'  , controller.update);
//router.patch    ('/:query'  , controller.update);
//router.delete   ('/:query'  , controller.destroy);

module.exports = router;
