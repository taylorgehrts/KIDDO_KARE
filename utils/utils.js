const convertJobDatesStore = job => {
    const newData = {}
    Object.assign(newData, job);

    newData.startTime = job.startTime.toISOString();
    newData.endTime = job.endTime.toISOString();

    console.log(newData);

    return newData;
}

const authParent = (req, res, next) => (req.session.loggedIn && !req.session.isSitter) ? next() : res.redirect('/login');

const authSitter = (req, res, next) => req.session.loggedIn && req.session.isSitter ? next() : res.redirect('/login');

module.exports = {
    convertJobDatesStore, 
    authParent, authSitter
}