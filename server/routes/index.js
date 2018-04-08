const user = require('./users');
const errorHandler = require('./errorHandler');

module.exports = app => {
  app.use('/user', user);

  errorHandler(app);
};
