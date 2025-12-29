const User = require('../models/user.model.js');

async function refineBlogDetails (createdBy, createdAt) {
    const authorDetails = await User.findOne({_id : createdBy});
    const author = authorDetails.fullName;
    const date = new Date(createdAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const uploadedAt = `${day}-${month}-${year}`;

    return {author, uploadedAt};
}

module.exports = {refineBlogDetails};