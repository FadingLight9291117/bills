FROM node:alpine

WORKDIR /app

ADD . /app

RUN yarn config set registry https://registry.npm.taobao.org/

CMD yarn install; \
    yarn start    
