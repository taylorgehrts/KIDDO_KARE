const User = require('./User');
const ParentInfo = require('./ParentInfo');
const SitterInfo = require('./SitterInfo');
const ChildInfo = require('./ChildInfo')
const Job = require('./Job');

User.hasOne(ParentInfo, { foreignKey: 'userId' });
ParentInfo.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(SitterInfo, { foreignKey: 'userId' });
SitterInfo.belongsTo(User, { foreignKey: 'userId' });

ParentInfo.hasMany(Job, { foreignKey: 'parentId' });
Job.belongsTo(ParentInfo, { foreignKey: 'parentId' });

Job.hasOne(SitterInfo, { foreignKey: 'workerId' });
SitterInfo.belongsTo(Job, { foreignKey: 'workerId' });

ParentInfo.hasMany(ChildInfo, { foreignKey: 'parentId' });
ChildInfo.belongsTo(ParentInfo, { foreignKey: 'parentId' });

module.exports = {
    User, ParentInfo, SitterInfo, ChildInfo,
    Job
}