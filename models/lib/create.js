const ChildInfo = require('../ChildInfo');
const Job = require('../Job');
const ParentInfo = require('../ParentInfo');
const SitterInfo = require('../SitterInfo');
const SitterInterests = require('../SitterInterests');
const User = require('../User');

const createUser = async (userData, isSitter, sitterOrParentData, childData = null) => {
    const userId = (await User.create(userData)).id;
    let result;

    if (isSitter) {
        result = await SitterInfo.create({ userId: userId, ...sitterOrParentData });
    } else {
        const parentId = (await ParentInfo.create({ userId: userId, ...sitterOrParentData })).id;
        if (Array.isArray(childData)) {
            result = await ChildInfo.bulkCreate(childData.map(child => ({ ...child, parentId: parentId})));
        } else {
            result = await ChildInfo.create({ parentId, ...childData });
        }
    }

    return result;
};

const convertJobDatesStore = job => {
    const newData = Object.create(job);

    newData.startTime = job.startTime.toISOString();
    newData.endTime = job.endTime.toISOString();

    return newData;
}

const createJob = async (jobData) => {
    return Array.isArray(jobData) ? await Job.bulkCreate(jobData.map(job => convertJobDatesStore(job))) 
    : await Job.create(convertJobDatesStore(jobData));
};

module.exports = {
    createUser, createJob
}