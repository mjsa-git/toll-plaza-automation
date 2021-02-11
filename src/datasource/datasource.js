const mongoose  = require('mongoose')

const dbCred =
process.env.DB_USER.length > 0  ? `${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@` : '';

db = mongoose.connect(`mongodb://${dbCred}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}` , {useNewUrlParser: true});

//db.addCollection("transactions");

module.exports = db;