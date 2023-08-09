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
        // TODO serialize parent data
        sitterOrParentData = {};

        childData = data.childData;
    }

    try {
        const result = await createUser(userData, isSitter, sitterOrParentData, childData);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;