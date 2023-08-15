const router = require('express').Router();

const { createUser } = require('../../models/lib/create');
const { auth, checkUser } = require('../../utils/utils');
const User = require('../../models/User');
const { SitterInfo } = require('../../models');

// Create a user and log them in
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
        sitterOrParentData = {
            bedTime: data.bedTime
        };

        childData = data.childData;
    }

    try {
        const result = await createUser(userData, isSitter, sitterOrParentData, childData);

        req.session.save(() => {
            req.session.userId = result.user.id;
            req.session.loggedIn = true;
            req.session.isSitter = isSitter;

            res.status(200).json({ message: 'POST /api/users successful! Logged in!', data: result});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    const name = req.body.userName;
    const email = req.body.email;
    const clearTextPassword = req.body.password;
    let user;

    if (name) {
        user = await User.findOne({ where: { userName: name } });
    } else if (email) {
        user = await User.findOne({ where: { email: email } });
    }

    if (!user) {
        return res.status(400).json({ message: "Incorrect username or password" });
    }

    const isSitter = (await user.getSitterInfo()) ? true : false;

    if (user.comparePasswordHash(clearTextPassword)) {
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.loggedIn = true;
            req.session.isSitter = isSitter;

            res.status(200).json({ message: 'Logged in!' });
        });
    } else {
        return res.status(400).json({ message: "Incorrect password" });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => res.status(204).json({ message: "Logged out!" }));
    } else {
        res.status(404).end();
    }
});

router.put('/:id', auth, async (req, res) => {
    const userData = {};
    const sitterData = {};
    const body = req.body;
    const userId = req.params.id;
    let result;

    try {
        // Disallow users editing other user's profile
        if (!checkUser(userId, req.session.userId)) {
            return res.status(401).end();
        }
        // Update user part
        if (body.userName) userData.userName = body.userName;
        if (body.firstName) userData.firstName = body.firstName;
        if (body.lastName) userData.lastName = body.lastName;
        if (body.address) userData.address = body.address;
        if (body.bio) userData.bio = body.bio;

        result = await User.update(userData, { where: { id: userId } });

        if (req.query.isSitter === 'true') {
            // Update sitter part if needed
            const sitterId = (await (await User.findByPk(userId)).getSitterInfo()).id;

            if (body.yearsExperience) sitterData.yearsExperience = body.yearsExperience;
            if (body.qualifications) sitterData.qualifications = body.qualifications;

            result.sitter = await SitterInfo.update(sitterData, { where: { id: sitterId } });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;