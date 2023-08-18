const router = require('express').Router();

const { User } = require('../../models');
const { auth } = require('../../utils/utils');

router.get('/', auth, async (req, res) => {
    const userId = req.session.userId;
    const loggedIn = req.session.loggedIn;
    let user;

    try {
        user = await User.findByPk(userId, { attributes:
        {
            exclude: ['password']
        } });
    } catch (err) {
        res.statusCode(500).json(err);
    }

    let info = await user.getSitterInfo();
    let isSitter;

    if (!info) {
        isSitter = false;
        info = await user.getParentInfo();
    } else {
        isSitter = true;
    }
    const userName = user.userName;
    res.render('edit', {
        userId,
        userName,
        isSitter,
        loggedIn,
        info
    });
});

module.exports = router;