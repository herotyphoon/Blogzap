const upload = require('../services/storeImage.service.js');

async function checkFileSize (req, res, next) {
    upload.single('cover')(req, res, function(err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).render('addBlog', { error: 'File too large. Max 2MB' });
            }
            return res.status(400).render('addBlog', { error: `❌ Upload failed: ${err.message}` });
        }
        next();
    })
}