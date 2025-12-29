require("dotenv").config({quiet: true});
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true,
});

module.exports = cloudinary;
