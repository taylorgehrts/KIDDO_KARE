const router = require('express').Router();

const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const sitterRoutes = require('./sitterRoutes');

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/sitters', sitterRoutes);

module.exports = router;