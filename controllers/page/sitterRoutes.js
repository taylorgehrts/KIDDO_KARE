const router = require('express').Router();

const User = require('../../models/User');

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    let user;
    try {
        user = await User.findByPk(userId);
    } catch (err) {
        res.status(400).json(err);
    }
    const sitter = await user.getSitterInfo();

    res.render('sitter', { 
        sitter: sitter.toJSON(), 
        user: user.toJSON(),
        isSitter: req.session.isSitter,
        loggedIn: req.session.loggedIn
     });
});

module.exports = router;