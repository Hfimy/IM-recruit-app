const path = require('path');
const user = require('./users');
const msg = require('./msg');
const errorHandler = require('./errorHandler');

module.exports = app => {
  app.use('/api/user', user);
  app.use('/api/msg', msg);

  // 添加路由通配符处理
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/build/index.html'));
  });
  // errorHandler(app);
};
