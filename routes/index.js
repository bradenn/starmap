let router = require('express').Router();

router.use('/', require('./main'));
router.use('/systems', require('./systems'));
router.use('/planets', require('./planets'));

module.exports = router;
