const mysql = require('mysql');

const cfg = {
    connectionLimit: 5,
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
    const sql = mysql.format(
        "SELECT * FROM bills WHERE date BETWEEN '?-?-1' AND '?-?-31' AND removed=0",
        [year, month, year, month]
    );
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) callback(results);
    });
}


function queryOne(id, callback) {
    id = parseInt(id);
    const sql = mysql.format(
        "SELECT * FROM bills WHERE id=?",
        [id]
    );
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) callback(results);
    });
}



function insert(date, money, cls, label, options, callback) {
    money = parseFloat(money);
    const sql = mysql.format(
        "INSERT INTO bills (date, money, cls, label, options) VALUES (?,?,?,?,?)",
        [date, money, cls, label, options]
    );
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) callback(results);
    })
}

function remove(id, callback) {
    id = parseInt(id);
    const sql = mysql.format(
        "UPDATE bills SET removed=1 WHERE id=?",
        [id]
    )
    pool.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results) callback(results);
    });
}

module.exports = {
    query: query,
    queryOne: queryOne,
    insert: insert,
    remove: remove
}



