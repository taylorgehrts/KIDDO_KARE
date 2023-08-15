const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('search', {
        isSitter: req.session.isSitter,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
    });
});

module.exports = router;