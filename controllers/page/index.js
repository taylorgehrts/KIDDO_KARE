const router = require('express').Router();

const loginRoutes = require('./loginRoutes');
const jobsRoutes = require('./jobsRoutes');
const jobRoutes = require('./jobRoutes');
const parentRoutes = require('./parentRoutes');
const sitterRoutes = require('./sitterRoutes');
const searchRoutes = require('./searchRoutes')

router.use('/login', loginRoutes);
router.use('/jobs', jobsRoutes);
router.use('/job', jobRoutes);
router.use('/parent', parentRoutes);
router.use('/sitter', sitterRoutes);
router.use('/search', searchRoutes);

module.exports = router;