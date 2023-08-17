const router = require('express').Router();

const { authParent } = require('../../utils/utils');

const { User } = require('../../models')

router.get('/', async (req, res) => {
    res.render('jobs', {
        isSitter: req.session.isSitter,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
    });
});

router.get('/:userId', authParent, async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        const parent = await user.getParentInfo();
        const jobs = await parent.getJobs();

        res.render('myJobs', {
            userId,
            userName: user.userName,
            loggedIn: req.session.loggedIn,
            isSitter: req.session.isSitter,
            jobs: jobs.map(job => job.toJSON())
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/sitter/:userId', authSitter, async (req, res) => {

});

module.exports = router;