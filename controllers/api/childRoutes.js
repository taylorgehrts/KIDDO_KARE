const { authParent, checkUser } = require('../../utils/utils');
const { addChild } = require('../../models/lib/create');

const router = require('express').Router();

router.post('/:userId', authParent, async (req, res) => {
    const userId = req.params.userId;
    const childData = req.body;
    let result;

    if (!checkUser(userId, req.session.userId)) {
        return res.status(401).end();
    }

    try {
        result = await addChild(userId, childData);

        res.status(201).json({
            userId,
            ...childData
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;