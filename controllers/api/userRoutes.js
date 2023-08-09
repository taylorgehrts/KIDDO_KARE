const router = require('express').Router();

const { createUser } = require('../../models/lib/create');

// POST a user
router.post('/', async (req, res) => {
    const data = req.body;
    const userData = {
        userName: data.userName,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        bio: data.bio
    }
    let sitterOrParentData;
    let childData = null;
    let isSitter = req.query.isSitter === 'true' ? true : false;

    if (isSitter) {
        sitterOrParentData = {
            yearsExperience: data.yearsExperience,
            qualifications: data.qualifications
        }
    } else {
        // TODO decide what goes in ParentInfo (if anything) and serialize it here
        sitterOrParentData = {};

        childData = data.childData;
    }

    try {
        const result = await createUser(userData, isSitter, sitterOrParentData, childData);

        req.session.save(() => {
            req.session.userId = result.user.id;
            req.session.loggedIn = true;

            res.status(200).json({ message: 'POST /api/user successful! Logged in!', data: result});
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;