const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {
        isSitter: req.session.isSitter, 
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
    });
});

module.exports = router;