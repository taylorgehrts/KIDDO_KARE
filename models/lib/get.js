const User = require('../User');
const Job = require('../Job');

const getChildren = async userId =>  await (
    await (
        await User.findByPk(userId)
    ).getParentInfo()
).getChildInfos();

const getJobsInterestedIn = async userId => await (
    await (
        await User.findByPk(userId)
    ).getSitterInfo()
).getJobsInterestedIn();

const getInterestedSitters = async jobId => Promise.all((await (
    await (
        await Job.findByPk(jobId)
    ).getInterestedSitters())
).map(async sitter => await sitter.getUser()));

const getChildrenInJob = async jobId => await (await Job.findByPk(jobId)).getChildInfos();

module.exports = {
    getChildren, getJobsInterestedIn, getInterestedSitters, getChildrenInJob
}