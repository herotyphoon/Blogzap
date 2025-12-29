const express = require('express');

const {handleRenderBlogs, handleRenderAddBlogPage, handleAddBlog, handleRenderSpecificBlog} = require("../controllers/blog.controllers");
const {restrictTo} = require("../middleware/auth.middleware");
const upload = require('../services/storeImage.service.js');

const router = express.Router();

router.get('/', handleRenderBlogs);

router.get('/add', restrictTo(['user', 'admin']), handleRenderAddBlogPage);

router.post('/add',restrictTo(['user', 'admin']), upload.single('cover'), handleAddBlog);

router.get('/:id', handleRenderSpecificBlog);

module.exports = router;