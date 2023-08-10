const router = require('express').Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;

const { Job, ParentInfo, User } = require('../../models');

router.get('/', async (req, res) => {
    // Set up variables and options object
    const filters = req.query;
    let result;
    let jobs;
    let options = { where: {}, include: { model: ParentInfo, include: User } };
    
    // Exclude jobs that have already started
    options.where.startDate =  { [Op.gte]: sequelize.fn('CURRDATE') };

    // Apply start and end filters if they are present in the query string
    if (filters.from && filters.to) {
        // Convert the dates from however they are formatted to the MySQL format
        const from = (new Date(filters.from)).toISOString();
        const to = (new Date(filters.to)).toISOString();

        // Apply the date filters to the options object
        options.where[Op.and] = [
            { startDate: { [Op.between]: [from, to] } }, 
            { endDate: { [Op.between]: [from, to] } }
        ];
    }

    requiresCooking = filters.requiresCooking;
    // Have to explicitly check for exact equals since query field can be undefined
    if (requiresCooking === false) {
        options.where.requiresCooking = false;
    } else if (requiresCooking === true) {
        options.where.requiresCooking = true;
    }

    // Wrap actual database query in a try/catch block
    try {
        // Apply filters to query
        jobs = await Job.findAll(options);
        // Serialize the job data objects
        result = jobs.map(job => job.toJSON());
    } catch (err) {
        res.status(500).json(err);
    }

    // Send the result
    res.status(200).json(result);
});

module.exports = router;