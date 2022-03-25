const express = require('express');
const cors = require('cors');
const { query, insert, remove, queryOne } = require('./data/mysql')
// const { getExcelData, billsFilter } = require('./data/excel');
// const excelFilePath = '../bills.xlsx';

const app = express();
const port = 8080;

app.use(cors()); // 解决跨域访问
app.use(express.json()); // 添加，否则req.post为undefined

app.get('/', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    console.log(`Query data of  ${year}-${month}.`);
    // const billsData = getExcelData(excelFilePath);
    // res.json(billsFilter(billsData, year, month));
    query(year, month, results => {
        res.json(results)
    });
});

app.post('/add', (req, res) => {
    const data = req.body;
    console.log(`insert ${data}`);
    insert(data.date, data.money, data.cls, data.label, data.options, results => res.json(results));
});

app.delete('/remove', (req, res) => {
    const id = req.query.id;
    let billItem;
    queryOne(id, results => billItem = results);
    console.log(`remove ${billItem}`);
    remove(id, results => res.json(results));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);
})


