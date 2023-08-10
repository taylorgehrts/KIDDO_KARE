const router = require('express').Router();

const { getChildrenInJob, getInterestedSitters } = require('../../models/lib/get');

router.get('/:id', async (req, res) => {
    const jobId = req.params.id;
    const children = getChildrenInJob(jobId);
    const interestedSitters = getInterestedSitters(jobId);
});

module.exports = router;