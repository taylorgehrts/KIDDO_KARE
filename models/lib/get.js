const User = require('../User');
const Job = require('../Job');

// TODO map all of these to json

const getChildren = async userId => {
    const user = await User.findByPk(userId);
    const parent = await user.getParentInfo();
    const children = await parent.getChildInfos();

    return children.map(child => child.toJson());
};

const getJobsInterestedIn = async userId => {
    const user = await User.findByPk(userId);
    const sitter = await user.getSitterInfo();
    const jobs = await sitter.getJobsInterestedIn();

    return jobs.map(job => job.toJson());
};

const getInterestedSitters = async jobId => {
    const job = Job.findByPk(jobId);
    const sitters = job.getInterestedSitters();
    const users = Promise.all(sitters.map(async sitter => await sitter.getUser()));

    return users.map(user => user.toJson());
}

const getChildrenInJob = async jobId => await (await Job.findByPk(jobId)).getChildInfos();

module.exports = {
    getChildren, getJobsInterestedIn, getInterestedSitters, getChildrenInJob
}