const xlsx = require('node-xlsx');
const express = require('express');
const app = express();
const port = 8080;

const dataPath = '../bills.xlsx';

const getData = (path) => {
    const sheets = xlsx.parse(path);
    const bills = [];
    sheets.forEach(sheet => {
        let data = sheet.data.slice(1);
        const title = sheet.data[0];
        data = data
            .map(item => {
                let item_map = {};
                item.forEach((v, i) => {
                    item_map[title[i]] = v;
                });
                item_map = {
                    '日期': new Date(1900, 0, item_map['日期'] - 1).toLocaleDateString(),
                    '类型': item_map['类型'],
                    '标签': item_map['标签'] ? item_map['标签'] : '其他',
                    '金额': item_map['金额'],
                    '说明': item_map['说明'] ? item_map['说明'] : '',
                }
                return item_map;
            })
            .filter(item => item['金额']);
        bills.push(...data);
    });
    return bills;
};

const billsFilter = (data, year, month) => data.filter(item => {
    const date = new Date(item['日期']);
    const _year = date.getFullYear();
    const _month = date.getMonth() + 1;
    return _year == year && _month == month;
});

const billsData = getData(dataPath);

app.get('/', (req, res) => {
    const year = req.query.year;
    const month = req.query.month;
    console.log(`Query data of  ${year}-${month}.`);
    res.json(billsFilter(billsData, year, month));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);
})


