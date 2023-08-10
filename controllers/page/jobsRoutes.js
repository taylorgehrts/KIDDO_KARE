const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('jobs');
});

module.exports = router;