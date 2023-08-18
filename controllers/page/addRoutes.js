const router = require('express').Router();

const { User } = require('../../models');
const { authParent } = require('../../utils/utils');

router.get('/', authParent, async (req, res) => {
    const userId = req.session.userId;
    const isSitter = req.session.isSitter;
    const loggedIn = req.session.loggedIn;
    const user = await User.findByPk(userId, { 
        attributes: {
             exclude: ['password'] 
            } });
    const parent = await user.getParentInfo();

    res.render('add', {
        userId,
        user,
        parent,
        isSitter,
        loggedIn
    });
});

module.exports = router;