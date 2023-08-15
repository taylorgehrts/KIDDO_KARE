const router = require('express').Router();

const loginRoutes = require('./loginRoutes');
const jobsRoutes = require('./jobsRoutes');
const jobRoutes = require('./jobRoutes');
const parentRoutes = require('./parentRoutes');
const sitterRoutes = require('./sitterRoutes');
const searchRoutes = require('./searchRoutes')
const homeRoutes = require('./homeRoutes');
const editRoutes = require('./editRoutes');
const addRoutes = require('./addRoutes');
const postRoutes = require('./postRoutes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);


router.use('/jobs', jobsRoutes);
router.use('/job', jobRoutes);
router.use('/parent', parentRoutes);
router.use('/sitter', sitterRoutes);
router.use('/search', searchRoutes);
router.use('/edit', editRoutes);
router.use('/add', addRoutes);
router.use('/post', postRoutes);

module.exports = router;