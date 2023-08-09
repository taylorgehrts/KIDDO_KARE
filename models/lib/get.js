const ChildInfo = require('../ChildInfo');
const ParentInfo = require('../ParentInfo');
const User = require('../User');

const getChildren = async userId =>  await (
    await (
        await User.findByPk(userId)
    ).getParentInfo()
).getChildInfos();

module.exports = {
    getChildren
}