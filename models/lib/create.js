const ChildInfo = require('../ChildInfo');
const Job = require('../Job');
const ParentInfo = require('../ParentInfo');
const SitterInfo = require('../SitterInfo');
const SitterInterests = require('../SitterInterests');
const User = require('../User');
const { convertJobDatesStore } = require('../../utils/utils');

const createUser = async (userData, isSitter, sitterOrParentData, childData = null) => {
    const userResult = await User.create(userData);
    const userId = userResult.id;
    let result = {};

    if (isSitter) {
        let sitterResult = await SitterInfo.create({ userId: userId, ...sitterOrParentData });
        result = { user: { ...userResult.toJSON() }, sitterInfo: { ...sitterResult.toJSON() } };
    } else {
        const parentResult = await ParentInfo.create({ userId: userId, ...sitterOrParentData });
        const parentId = parentResult.id;
        if (Array.isArray(childData)) {
            let childrenResult = await ChildInfo.bulkCreate(childData.map(child => ({ ...child, parentId: parentId })));
            result = {
                user: { ...userResult.toJSON() },
                parentInfo: { ...parentResult.toJSON() },
                children: childrenResult.map(child => child.toJSON())
            }
        } else {
            const childResult = await ChildInfo.create({ parentId, ...childData });
            result = {
                user: { ...userResult.toJSON() },
                parentInfo: { ...parentResult.toJSON() },
                child: { ...childResult.toJSON() }
            };
        }
    }

    return result;
};

const createJob = async (userId, jobData) => {
    const parentId = (await (await User.findByPk(userId)).getParentInfo()).id;

    console.log(parentId)

    const result = Array.isArray(jobData) ? await Job.bulkCreate(jobData.map(job => ({ ...convertJobDatesStore(job), parentId })))
        : await Job.create(({ ...convertJobDatesStore(jobData), parentId}));

    console.log(result);

    return result;
};

const interestSitter = async (userId, jobId) => {
    return await SitterInterests.create({
        sitterId: (await (await User.findByPk(userId)).getSitterInfo()).id,
        jobId: jobId
    });
};

const addChild = async (userId, childData) => {
    const parentId = (await (await User.findByPk(userId)).getParentInfo()).id;

    return await ChildInfo.create({...childData, parentId});
};

module.exports = {
    createUser, createJob,
    interestSitter, addChild
}