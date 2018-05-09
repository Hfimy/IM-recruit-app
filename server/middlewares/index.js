const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = app => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.json());

  // 添加静态资源前缀，与前端打包的publicPath对应
  app.use(
    '/public',
    express.static(path.resolve(__dirname, '../public/build'))
  );
};
