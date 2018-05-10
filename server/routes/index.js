const express = require('express');
const path = require('path');
const user = require('./users');
const msg = require('./msg');
const errorHandler = require('./errorHandler');
const handleServerRender = require('./ssr').default;

module.exports = app => {
  app.use('/api/user', user);
  app.use('/api/msg', msg);

  // 产品环境下增加服务器端渲染支持，但此处传入productin报错，暂使用test实现
  if (process.env.NODE_ENV === 'test') {
    // 添加静态资源前缀，与前端打包的publicPath对应
    app.use('/public', express.static(path.resolve(__dirname, '../../build')));

    // 添加路由通配符处理
    app.get('*', handleServerRender);
  }

  errorHandler(app);
};
