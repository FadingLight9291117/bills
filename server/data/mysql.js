const mysql = require('mysql');

const cfg = {
    connectionLimit: 1,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'bill',
}


const pool = mysql.createPool(cfg);

function query(year, month, callback) {
    year = parseInt(year);
    month = parseInt(month);
    const res = [];
    const sql = mysql.format(
        "select * from bills where date between '?-?-1' and '?-?-31'",
        [year, month, year, month]
    )
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) {
            callback(results);
        }
    })
    return res;
}

module.exports.query = query



