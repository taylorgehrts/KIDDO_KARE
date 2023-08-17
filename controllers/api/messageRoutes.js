const router = require('express').Router();

const { Message } = require('../../models');

router.get('/:jobId', async (req, res) => {
    const messages = await Message.findAll({
        where: {
            jobId: req.params.jobId
        }
    });

    res.status(200).json(messages.map(message => message.toJSON()));
});

module.exports = router;