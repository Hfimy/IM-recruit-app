const express = require('express');
const path = require('path');
const user = require('./users');
const msg = require('./msg');
const errorHandler = require('./errorHandler');

module.exports = app => {
  app.use('/public', express.static(path.resolve(__dirname, '../../build')));

  app.use('/api/user', user);
  app.use('/api/msg', msg);

  // 产品环境下增加服务器端渲染支持，但此处传入productin报错，暂使用test实现
  if (process.env.NODE_ENV === 'test') {
    // 添加静态资源前缀，与前端打包的publicPath对应
    // 添加路由通配符处理
    const handleServerRender = require('./ssr').default;
    app.get('*', handleServerRender);
  }

  // 默认情况下
  app.get('*', (req, res) => {
    const assetManifest = require(path.resolve(
      __dirname,
      '../../build/asset-manifest.json'
    ));
    res.render('index', {
      title: 'Bosszhipin',
      PUBLIC_URL: '/public/',
      rootHtml: '',
      assetManifest
    });
  });
  errorHandler(app);
};
