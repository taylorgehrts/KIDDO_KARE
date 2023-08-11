const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;