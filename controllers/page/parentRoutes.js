const router = require('express').Router();

const { User, ParentInfo } = require('../../models');
const { getChildren } = require('../../models/lib/get');

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const parent = await user.getParentInfo();
    const jobs = await parent.getJobs();
    const children = await getChildren(userId);

    res.render('parent', { 
         user: user.toJSON(),
         parent: parent.toJSON(), 
         jobs: jobs.map(job => job.toJSON()), 
         children,
         loggedIn: req.session.loggedIn,
         isSitter: req.session.isSitter,
         ownProfile: userId == req.session.userId,
         userId
        });
});

module.exports = router;