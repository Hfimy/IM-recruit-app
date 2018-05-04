const user = require('./users');
const msg = require('./msg');
const errorHandler = require('./errorHandler');

module.exports = app => {
  app.use('/user', user);
  app.use('/msg', msg);

  errorHandler(app);
};
