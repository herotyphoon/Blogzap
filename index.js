require('dotenv').config({quiet: true});
const path = require("path");
const express = require('express');
const cookieParser = require('cookie-parser');

const { connectDB } = require('./config/db.config.js');
const rootRoutes = require('./routes/root.routes.js');
const userRoutes = require('./routes/user.routes.js');
const blogRoutes = require('./routes/blog.routes.js');
const {handleNoRoutesMatch} = require('./controllers/404.controllers.js');
const { checkForAuthentication } = require('./middleware/auth.middleware.js');

const app = express();
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

connectDB(connectionString)
    .then(() => console.log('MongoDB Connected'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/', rootRoutes);
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);
app.use(handleNoRoutesMatch)

app.listen(port, () => {
    console.log('Server Listening');
})
