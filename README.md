个人财务管理系统

# 开发中发现的问题

## 2022.05.23

1. Map 的添加元素

```js
// cls2Label是一个 Map 对象；
// const cls2Lael = new Map();
cls2Label[i] = clsLabelData[i]; // 这样添加元素会导致 `size` 不增加，即 `size=0`，进而导致无法遍历此 map 得到键值对。
```

2. Map 的遍历

```js
cls2Label.forEach((v, k) => {}); // v, k Map 的遍历 value 在前，key 在后
```
