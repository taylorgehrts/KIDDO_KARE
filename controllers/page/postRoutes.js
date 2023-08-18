const router = require('express').Router();

const { User } = require('../../models');
const { authParent } = require('../../utils/utils');

router.get('/', authParent, async (req, res) => {
    const userId = req.session.userId;
    const user = await User.findByPk(userId, { 
        attributes: { 
            exclude: ['password'] 
        } 
    });
    res.render('post', { 
        user,
        isSitter: req.session.isSitter,
        loggedIn: req.session.loggedIn,
        userId
    });
});

module.exports = router;