const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/recruit';

const db = mongoose.createConnection(DB_URL);

db.on('connected', () => {
  console.log('mongodb connect success');
});

db.on('disconnected', () => {
  console.log('mongodb connect close');
});

const user = require('./user');

const models = Object.assign({}, user);

for (let key of Object.keys(models)) {
  db.model(key, new mongoose.Schema(models[key]));
}

module.exports = {
  getModel(name) {
    return db.model(name);
  }
};
