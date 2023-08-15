const router = require('express').Router()
const sequelize = require('sequelize');
const Op = sequelize.Op

const { SitterInfo, User, Job } = require('../../models');
const { interestSitter } = require('../../models/lib/create');


router.get('/', async (req, res) => {
    const filters = req.query;
    let options = { where: {}, include: { model: User, attributes: { exclude: ['password'] } } };
    let result;

    if (filters.yearsExperience) {
        options.where.yearsExperience = { [Op.gte]: filters.yearsExperience };
    }

    if (filters.qualifications) {
        options.where[Op.or] = [];
        qualifications = filters.qualifications.split(',');
        qualifications.forEach(qualification => {
            options.where[Op.or].push({ qualifications: sequelize.where(sequelize.fn('LOWER', sequelize.col('qualifications')), 'LIKE', '%' + qualification + '%')  })
        });
    }

    try {
        const sitters = await SitterInfo.findAll(options);
        result = sitters.map(sitter => sitter.toJSON());
    } catch (err) {
        res.status(500).json(err);
    }

    res.status(200).json(result);
});

router.post('/interest', async (req, res) => {
    try {
        await interestSitter(req.session.userId, req.query.jobId);

        res.status(200).json({ message: "Interest registered!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:sitterId/accept/:jobId', async (req, res) => {
    const sitterId = req.params.sitterId;
    const jobId = req.params.jobId;

    try {
        await Job.update({ workerId: sitterId }, {
            where: {
                id: jobId
            }
        });

        res.status(200).json({ message: "Sitter accepted!" });
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;