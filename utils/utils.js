const { User } = require('../models');

const convertJobDatesStore = job => {
    const newData = {}
    Object.assign(newData, job);

    newData.startTime = job.startTime.toISOString();
    newData.endTime = job.endTime.toISOString();

    return newData;
}

const auth = (req, res, next) => req.session.loggedIn ? next() : res.redirect('/login');

const authParent = (req, res, next) => (req.session.loggedIn && !req.session.isSitter) ? next() : res.redirect('/login');

const authSitter = (req, res, next) => req.session.loggedIn && req.session.isSitter ? next() : res.redirect('/login');

const checkUser = async (userId, sessionId) => {
    if (userId != (await User.findByPk(sessionId)).id) {
        return false;
    }

    return true;
}

module.exports = {
    convertJobDatesStore, 
    auth, authParent, authSitter,
    checkUser
}