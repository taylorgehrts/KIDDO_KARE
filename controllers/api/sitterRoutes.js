const router = require('express').Router()

const { SitterInfo, User } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op

router.get('/', async (req, res) => {
    const filters = req.query;
    let options = { where: {}, include: User};
    let result;

    if (filters.yearsExperience) {
        options.where.yearsExperience = { [Op.gte]: filters.yearsExperience };
    }

    if (filters.qualifications) {
        options.where[Op.or] = [];
        filters.qualifications.forEach(qualification => {
            options.where[Op.or].push({ qualifications: sequelize.where(sequelize.fn('LOWER', sequelize.col('qualifications')), 'LIKE', '%' + qualification + '%')  })
        });
    }

    try {
        const sitters = await SitterInfo.findAll(options)
        result = sitters.map(sitter => sitter.toJSON());
    } catch (err) {
        res.status(500).json(err);
    }

    res.status(200).json(result);
});

module.exports = router;