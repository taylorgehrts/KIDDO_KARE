const router = require('express').Router();

const { User } = require('../../models');
const { auth } = require('../../utils/utils');

router.get('/', auth, async (req, res) => {
    const userId = req.session.userId;
    let user;

    try {
        user = await User.findByPk(userId);
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

    res.render('edit', {
        user,
        isSitter,
        info
    });
});

module.exports = router;