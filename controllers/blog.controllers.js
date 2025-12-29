const cloudinary = require('../config/cloudinary.config.js');
const {Types} = require("mongoose");

const Blog = require('../models/blog.model.js');
const {refineBlogDetails} = require('../services/refineBlogDetails.service.js');

async function handleRenderBlogs(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const search = (req.query.search || "").trim();

    const query = search
        ? {
            $or: [
                { title:       { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { content:     { $regex: search, $options: "i" } }
            ]
        }
        : {};

    try {
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "fullName")
            .lean();

        const totalBlogs = await Blog.countDocuments(query);
        const totalPages = Math.ceil(totalBlogs / limit) || 1;

        res.render("blog", {
            blogs,
            search,
            message: search && blogs.length === 0
                ? `No blogs found for "${search}".`
                : null,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });

    } catch (error) {
        console.log(error);
        return res.status(500).render('blog', {message: "Error fetching blogs"});
    }
}


function handleRenderAddBlogPage (req, res) {
    return res.render('addBlog');
}

async function handleAddBlog (req, res) {
    if (!req.body) return res.redirect('/blog');

    const { title, content } = req.body;
    const createdBy = req.user._id;
    const description = content.substring(0,100);

    const result = await cloudinary.uploader.upload_stream(
        {
            folder: `blogzap/${createdBy}`,
            resource_type: "image"
        },
        async (error, cloudResult) => {
            if (error) {
                console.error('Cloudinary error:', error);
                return res.redirect('/blog');
            }

            await Blog.create({
                title,
                description,
                content,
                coverImageURL: cloudResult.secure_url,
                createdBy,
            });

            return res.redirect('/blog');
        }
    ).end(req.file.buffer);
}

async function handleRenderSpecificBlog (req, res) {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(404).render("404", { url: req.originalUrl });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
        return res.status(404).render("404", { url: req.originalUrl });
    }

    const {title, content, coverImageURL, createdBy, createdAt} = blog;
    const {author, uploadedAt} = refineBlogDetails(createdBy, createdAt);

    res.render('specificBlog', { title, content, author, uploadedAt, coverImageURL });
}

module.exports = {handleRenderBlogs, handleRenderAddBlogPage, handleAddBlog, handleRenderSpecificBlog}