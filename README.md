个人财务管理系统

# 开发中发现的问题

## 2022.05.23

1. js Map 的添加元素

```js
// cls2Label是一个 Map 对象；
// const cls2Lael = new Map();
cls2Label[i] = clsLabelData[i]; // 这样添加元素会导致 `size` 不增加，即 `size=0`，进而导致无法遍历此 map 得到键值对。
```

1. Map 的遍历

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

## 2022.06.05

1. mysql
   mysql 建表可以为字段添加注释 `comment`关键字

```sql
create table test(
	id int not null default 0 comment '用户id'
)
```

显示注释

```sql
show full columns from <table>
```

2. nginx

[文档](https://hub.docker.com/_/nginx)

nginx 的 docker 镜像，在启动一个容器时，会有一个 function 读取模板文件`/etc/nginx/templates/*.template`，然后输出到`/etc/nginx/conf.d`中。

因此可以在 compose 文件中定义一些环境变量，并在 template 文件中引用

docker-compose.yaml

```yaml
web:
  image: nginx
  volumes:
    - ./templates:/etc/nginx/templates
  ports:
    - "8080:80"
  environment:
    - NGINX_HOST=foobar.com
    - NGINX_PORT=80
```

templates/default.conf.template

```conf
server {
  listen  ${NGINX_PORT};
}
```

输出到 `/etc/nginx/conf.d/default.conf`

```conf
server {
  listen 80;
}

```
