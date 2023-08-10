const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./page')

router.use('/api', apiRoutes);
router.use('/', pageRoutes);

module.exports = router;