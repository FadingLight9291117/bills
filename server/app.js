const express = require('express');
const {getExcelData, billsFilter} = require('./data/excel');
const {query} = require('./data/mysql')

const app = express();
const port = 8080;


const excelFilePath = '../bills.xlsx';


app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': req.headers.origin || '*',
    })
    next()
})

app.get('/', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    console.log(`Query data of  ${year}-${month}.`);
    // const billsData = getExcelData(excelFilePath);
    // res.json(billsFilter(billsData, year, month));
    query(year, month, results => {
        res.json(results)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);
})


