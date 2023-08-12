const router = require('express').Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { authParent } = require('../../utils/utils');
const { createJob } = require('../../models/lib/create');
const { Job, ParentInfo, User } = require('../../models');

router.get('/', async (req, res) => {
    // Set up variables and options object
    const filters = req.query;
    let result;
    let jobs;
    let options = { where: {}, include: { model: ParentInfo, include: User } };
    
    // Exclude jobs that have already started
    options.where.startTime =  { [Op.gte]: sequelize.fn('CURDATE') };

    // Apply start and end filters if they are present in the query string
    if (filters.from && filters.to) {
        // Convert the dates from however they are formatted to the MySQL format
        const from = (new Date(filters.from)).toISOString();
        const to = (new Date(filters.to)).toISOString();

        // Apply the date filters to the options object
        options.where[Op.and] = [
            { startTime: { [Op.between]: [from, to] } }, 
            { endTime: { [Op.between]: [from, to] } }
        ];
    }

    if (filters.cookingNotOk === true) {
        options.where.requiresCooking = false;
    }

    // Wrap actual database query in a try/catch block
    try {
        // Apply filters to query
        jobs = await Job.findAll(options);
        // Serialize the job data objects   
        result = jobs.map(job => job.toJSON());
        console.log(result);
    } catch (err) {
        res.status(500).json(err);
    }

    // Send the result
    res.status(200).json(result);
});

router.post('/:userId', authParent, async (req, res) => {
    let result;
    const jobData = req.body;

    jobData.startTime = new Date(jobData.startTime);
    jobData.endTime = new Date(jobData.endTime);

    try {
        result = await createJob(Number(req.params.userId), jobData);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}); 

module.exports = router;