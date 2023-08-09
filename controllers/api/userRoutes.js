const router = require('express').Router();

const { createUser } = require('../../models/lib/create');
const User = require('../../models/User');

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
        sitterOrParentData = {};

        childData = data.childData;
    }

    try {
        const result = await createUser(userData, isSitter, sitterOrParentData, childData);

        req.session.save(() => {
            req.session.userId = result.user.id;
            req.session.loggedIn = true;

            res.status(200).json({ message: 'POST /api/users successful! Logged in!', data: result});
        });
    } catch (err) {
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

    if (user.comparePasswordHash(clearTextPassword)) {
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.loggedIn = true;

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

module.exports = router;