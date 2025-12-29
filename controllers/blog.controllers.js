const Blog = require('../models/blog.model.js');
const {refineBlogDetails} = require('../services/refineBlogDetails.service.js');

async function handleRenderBlogs(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'fullName')
            .lean();

        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);

        res.render('blog', {
            blogs,
            currentPage: page,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });

    } catch (error) {
        res.status(500).send("Error fetching blogs");
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
    await Blog.create({
        title,
        description,
        content,
        coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
        createdBy,
    });

    return res.redirect('/blog');
}

async function handleRenderSpecificBlog (req, res) {
    const _id = req.params.id;
    const blog = await Blog.findOne({_id});

    const {title, content, coverImageURL, createdBy, createdAt} = blog;
    const {author, uploadedAt} = refineBlogDetails(createdBy, createdAt);

    res.render('specificBlog', { title, content, author, uploadedAt, coverImageURL });
}

module.exports = {handleRenderBlogs, handleRenderAddBlogPage, handleAddBlog, handleRenderSpecificBlog}