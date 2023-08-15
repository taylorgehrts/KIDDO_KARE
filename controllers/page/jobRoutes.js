const router = require('express').Router();

const { getChildrenInJob, getInterestedSitters } = require('../../models/lib/get');
const { Job, SitterInfo } = require('../../models');

router.get('/:id', async (req, res) => {
    const jobId = req.params.id;
    const loggedIn = req.session.loggedIn;
    let job;
    let acceptedUser;
    let jobJson;
    try {
        job = await Job.findByPk(jobId);
        jobJson = job.toJSON();
    } catch (err) {
        return res.status(400).json(err);
    }
    const children = await getChildrenInJob(jobId);
    const interestedSitters = await getInterestedSitters(jobId);
    console.log(req.session.loggedIn, req.session.isSitter);

    acceptedUser = await job.getWorker();
    let acceptedUserId;
    let acceptedUserName;
    if (acceptedUser) {
        acceptedUserId = acceptedUser.id;
        acceptedUserName = await (await acceptedUser.getUser()).userName;
    }
    console.log(acceptedUserId, acceptedUserName);
    res.render('job', { job: jobJson, children, interestedSitters,
                        isSitter: req.session.isSitter,
                        loggedIn,
                        userId: req.session.userId, 
                        acceptedUserId, acceptedUserName
                    });
});

module.exports = router;