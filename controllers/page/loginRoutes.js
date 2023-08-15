const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn,
        isSitter: req.session.isSitter
    });
});



module.exports = router;