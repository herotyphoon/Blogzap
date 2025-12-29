function handleNoRoutesMatch (req, res) {
    res.status(404).render('404', {
        url: req.originalUrl
    });
}

module.exports = {handleNoRoutesMatch};
