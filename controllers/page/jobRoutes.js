const router = require('express').Router();

const { getChildrenInJob, getInterestedSitters } = require('../../models/lib/get');
const Job = require('../../models/Job');

router.get('/:id', async (req, res) => {
    const jobId = req.params.id;
    let job;
    try {
        job = (await Job.findByPk(jobId)).toJSON();
    } catch (err) {
        return res.status(400).json(err);
    }
    const children = getChildrenInJob(jobId);
    const interestedSitters = getInterestedSitters(jobId);

    res.render('job', { job, children, interestedSitters,
                        isSitter: req.session.isSitter,
                        userId: req.session.userId });
});

module.exports = router;