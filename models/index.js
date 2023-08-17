const User = require('./User');
const ParentInfo = require('./ParentInfo');
const SitterInfo = require('./SitterInfo');
const ChildInfo = require('./ChildInfo')
const Job = require('./Job');
const SitterInterests = require('./SitterInterests');
const Message = require('./Message');

User.hasOne(ParentInfo, { foreignKey: 'userId' });
ParentInfo.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(SitterInfo, { foreignKey: 'userId' });
SitterInfo.belongsTo(User, { foreignKey: 'userId' });

ParentInfo.hasMany(Job, { foreignKey: 'parentId' });
Job.belongsTo(ParentInfo, { foreignKey: 'parentId' });

SitterInfo.hasMany(Job, { foreignKey: 'workerId', as: 'worker' });
Job.belongsTo(SitterInfo, { foreignKey: 'workerId', as: 'worker' });

ParentInfo.hasMany(ChildInfo, { foreignKey: 'parentId' });
ChildInfo.belongsTo(ParentInfo, { foreignKey: 'parentId' });

Job.hasMany(ChildInfo, { foreignKey: 'jobId' });
ChildInfo.belongsTo(Job, { foreignKey: 'jobId' });

SitterInfo.belongsToMany(Job, { 
    through: SitterInterests, 
    foreignKey: 'sitterId', 
    as: 'jobsInterestedIn'
});
Job.belongsToMany(SitterInfo, { 
    through: SitterInterests, 
    foreignKey: 'jobId',
    as: 'interestedSitters'
 });

 Job.hasMany(Message, { foreignKey: 'jobId' });
 Message.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = {
    User, ParentInfo, SitterInfo, ChildInfo,
    Job, SitterInterests
}