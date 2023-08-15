const router = require('express').Router();

const { log } = require('console');
const { User, ParentInfo } = require('../../models');
const { getChildren } = require('../../models/lib/get');

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    let user;
    const loggedIn = req.session.loggedIn;
    try{
        user = await User.findByPk(userId);
    } catch (err) {
        return res.status(400).json(err);
    }
    const parent = await user.getParentInfo();
    const jobs = await parent.getJobs();
    const children = await getChildren(userId);

    let loggedInUser;
    if (loggedIn) {
        loggedInUser = (await User.findByPk(req.session.userId)).id;
    }

    res.render('parent', { 
         user: user.toJSON(),
         parent: parent.toJSON(), 
         jobs: jobs.map(job => job.toJSON()), 
         children,
         loggedIn,
         isSitter: req.session.isSitter,
         ownProfile: userId == req.session.userId,
         userId,
         loggedInUser
        });
});

module.exports = router;