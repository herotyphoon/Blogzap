require('dotenv').config({quiet: true});
const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        coverImageURL: {
            type: String,
            required: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = model("Blog", blogSchema);