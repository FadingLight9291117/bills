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

## 2022.06.03

1. object 转 Map

```js
let obj = {
  a: 1,
  b: 2,
};

let m = new Map(Object.entries(obj)); // Object.entries(obj) 会将 obj转化为[[key, value], ...]的形式
```

2. 关于 fetch 的 post 请求传递 json

```js
headers: {
            'Content-Type': 'application/json'
        }, // 必须添加，否则后端接收不到json
```

3. vue.config.js 的 proxy

在添加 ` pathRewrite: { '^/api': '' }`

```js
 proxy: {
      '/api': {
        target: "...",
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    }
```

时注意 `/api/` 和 `/api`的不同
