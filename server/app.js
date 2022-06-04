const express = require('express');
const cors = require('cors');
const { query, insert, remove, queryOne } = require('./data/mysql')
// const { getExcelData, billsFilter } = require('./data/excel');
// const excelFilePath = '../bills.xlsx';

const app = express();
const port = 8080;

app.use(cors()); // 解决跨域访问
app.use(express.json()); // 添加，否则req.post为undefined

const listBill = (req, res) => {
    let year = req.query.year;
    let month = req.query.month;
    const now = new Date();
    year = year ? year : now.getFullYear();
    month = month ? month : now.getMonth() + 1;

    console.log(`Query data of  ${year}-${month}.`);
    // const billsData = getExcelData(excelFilePath);
    // res.json(billsFilter(billsData, year, month));
    query(year, month, results => {
        res.json(results)
    });
}
const addBill = (req, res) => {
    const data = req.body;
    console.log(`insert ${data}`);
    insert(data.date, data.money, data.cls, data.label, data.options, results => res.json(results));
}
const removeBill = (req, res) => {
    const id = req.query.id;
    queryOne(id, results => console.log(`remove ${JSON.stringify(results)}`));
    remove(id, results => res.json(results));
}

app.get('/api/listBill', listBill);
app.post('/api/addBill', addBill);
app.delete('/api/remove', removeBill);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);
})


