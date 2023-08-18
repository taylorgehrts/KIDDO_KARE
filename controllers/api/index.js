const router = require('express').Router();

const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
const sitterRoutes = require('./sitterRoutes');
const childRoutes = require('./childRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/children', childRoutes);
router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/sitters', sitterRoutes);
router.use('/messages', messageRoutes);

module.exports = router;