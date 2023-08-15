const { Job } = require('../models');

module.exports = {
    isJobOwner: function(userId, jobOwnerId, options) {
        if (userId === jobOwnerId) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },
    showChat: function(jobOwnerId, userId, acceptedUserId, options) {
        if (userId == jobOwnerId || userId == acceptedUserId) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    }
}