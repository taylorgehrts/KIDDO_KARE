const User = require('./User');
const ParentInfo = require('./ParentInfo');
const SitterInfo = require('./SitterInfo');

const Job = require('./Job');

User.hasOne(ParentInfo, { foreignKey: 'parentInfoId' });
ParentInfo.belongsTo(User, { foreignKey: 'parentInfoId' });

User.hasOne(SitterInfo, { foreignKey: 'sitterInfoId' });
SitterInfo.belongsTo(User, { foreignKey: 'sitterInfoId' });

ParentInfo.hasMany(Job, { foreignKey: 'parentId' });
Job.belongsTo(ParentInfo, { foreignKey: 'parentId' });

module.exports = {
    User, ParentInfo, SitterInfo,
    Job
}