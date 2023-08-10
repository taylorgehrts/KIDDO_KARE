const router = require('express').Router();

const { User, ParentInfo } = require('../../models');
const { getChildren } = require('../../models/lib/get');

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const parent = await user.getParentInfo();
    const jobs = parent.getJobs();
    const children = await getChildren(userId);

    res.render('parent', { user, parent, jobs, children });
});

module.exports = router;