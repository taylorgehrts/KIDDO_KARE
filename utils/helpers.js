const { Job } = require('../models');

module.exports = {
    showChat: function(jobOwnerId, userId, acceptedUserId, options) {
        // console.log(jobOwnerId, userId, acceptedUserId);
        if (userId == jobOwnerId || userId == acceptedUserId) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
}