-- 建库
CREATE DATABASE IF NOT EXISTS bill;
-- 建表
USE bill;
CREATE TABLE IF NOT EXISTS bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    cls VARCHAR(10),
    label VARCHAR(10) DEFAULT "其他",
    money FLOAT,
    options TEXT DEFAULT ""
);
INSERT INTO bills (date, cls, label, money)
VALUES ("2020/3/2", "餐饮", "早餐", 32.2)

