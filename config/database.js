// import from mysql
const mysql = require("mysql");

const koneksi = mysql.createConnection({
    host: "localhost",
    user: "hakim",
    password: "hakim1234",
    database: "pirate",
    multipleStatements: true
});

koneksi.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected...");
});

module.exports = koneksi;
