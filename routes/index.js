let router = require('express').Router();

router.use('/', require('./main'));
router.use('/charts', require('./charts'));
router.use('/systems', require('./systems'));
router.use('/planets', require('./planets'));
router.use('/moons', require('./moons'));

module.exports = router;
