const {connect} = require('mongoose');

async function connectDB(connectionString) {
    return connect(connectionString, {dbName: "blogzap"});
}

module.exports = {connectDB};