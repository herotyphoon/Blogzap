const multer = require('multer');
const fs = require('fs');
const path = require('path');

function storeImage() {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            if (!req.user) return cb(new Error("User missing"), null);

            const uploadPath = path.join(__dirname, '..', 'public', 'uploads', req.user._id.toString());
            fs.mkdirSync(uploadPath, { recursive: true });

            cb(null, uploadPath);
        },
        filename(req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        }
    });

    return multer({ storage });
}

module.exports = {storeImage};

