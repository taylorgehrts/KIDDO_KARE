const router = require('express').Router();

const User = require('../../models/User');

router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const sitter = user.getSitterInfo();

    res.render('sitter', { sitter: sitter.toJson() });
});

module.exports = router;