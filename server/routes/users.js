const router = require('express').Router();
const model = require('../db');
const User = model.getModel('user');
const md5 = require('../util/md5');

const _filter = { pwd: 0, __v: 0 };

router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (err, data) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器错误' });
    }
    if (data) {
      return res.json({ code: 1, msg: '用户名已存在' });
    }
    const userInstance = new User({ user, pwd: md5(pwd), type });
    userInstance.save((err, data) => {
      if (err) {
        return res.json({ code: 1, msg: '服务器错误' });
      }
      const { _id, user, type } = data;
      res.cookie('uid', _id);
      res.json({ code: 0 });
    });
  });
});

router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5(pwd) }, _filter, (err, data) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器错误' });
    }
    if (!data) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('uid', data._id);
    res.json({ code: 0, data });
  });
});

router.post('/info', (req, res) => {
  const { uid } = req.cookies;
  if (!uid) {
    return res.json({ code: 1, msg: '身份过期，请重新登录' });
  }
  User.update({ _id: uid }, { $set: req.body }, (err, data) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器错误' });
    }
    User.findById(uid, _filter, (err, data) => {
      if (err) {
        return res.json({ code: 1, msg: '服务器错误' });
      }
      res.json({ code: 0, data });
    });
  });
});

router.get('/info', (req, res) => {
  const { uid } = req.cookies;
  if (!uid) {
    return res.json({ code: 1, msg: '身份过期，请重新登录' });
  }
  User.findById(uid, _filter, (err, data) => {
    if (err) {
      return res.json({ code: 1, msg: '服务器错误' });
    }
    if (!data) {
      return res.json({ code: 1, msg: '用户不存在' });
    }
    res.json({ code: 0, data });
  });
});

router.get('/list', (req, res, next) => {
  const { uid } = req.cookies;
  if (!uid) {
    return res.json({ code: 1, msg: '身份过期，请重新登录' });
  }
  const queries = {};
  for (let i of Object.keys(req.query)) {
    if (i !== undefined) {
      if (i === 'leftSalary') {
        const left = Math.min(
          req.query['leftSalary'],
          req.query['rightSalary']
        );
        const right = Math.max(
          req.query['leftSalary'],
          req.query['rightSalary']
        );
        queries.leftSalary = {
          $gte: left
        };
        queries.rightSalary = {
          $lte: right
        };
        continue;
      }
      if (i === 'rightSalary' || i === 'limit' || i === 'skip') {
        continue;
      }
      queries[i] = req.query[i];
    }
  }
  let { limit = 10, skip = 0 } = req.query;
  limit = Number(limit);
  skip = Number(skip);
  User.find(queries, _filter)
    .limit(limit)
    .skip(skip)
    .exec((err, data) => {
      if (err) {
        return res.json({ code: 1, msg: '服务器错误' });
      }
      res.json({ code: 0, data });
    });
});

module.exports = router;
