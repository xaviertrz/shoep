const db = require("better-sqlite3")(process.env.DBSOURCE);

module.exports = db;
