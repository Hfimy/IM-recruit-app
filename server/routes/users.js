const router = require('express').Router();
const model = require('../db');
const User = model.getModel('user');
const md5 = require('../util/md5');
const checkError = require('../util/checkError');

const _filter = { pwd: 0, __v: 0 };

router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (err, data) => {
    checkError(err);
    if (data) {
      return res.json({ code: 1, msg: '用户名已存在' });
    }
    const userInstance = new User({ user, pwd: md5(pwd), type });
    userInstance.save((err, data) => {
      checkError(err);
      const { _id, user, type } = data;
      res.cookie('uid', _id);
      res.json({ code: 0 });
    });
  });
});

router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5(pwd) }, _filter, (err, data) => {
    checkError(err);
    if (!data) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('uid', data._id);
    res.json({ code: 0, data });
  });
});

router.get('/info', (req, res) => {
  const { uid } = req.cookies;
  if (!uid) {
    return res.json({ code: 1, msg: '验证失败，请重新登录' });
  }
  User.findById(uid, _filter, (err, data) => {
    checkError(err);
    if (!data) {
      return res.json({ code: 1, msg: '用户不存在' });
    }
    res.json({ code: 0, data });
  });
});

router.post('/update', (req, res) => {
  const { uid } = req.cookies;
  if (!uid) {
    return res.json({ code: 1, msg: '用户未登录' });
  }
  if (!req.body.avatar) {
    return res.json({ code: 1, msg: '请选择头像' });
  }
  User.update({ _id: uid }, { $set: req.body }, (err, data) => {
    checkError(err);
    User.findById(uid, _filter, (err, data) => {
      checkError(err);
      res.json({ code: 0, data });
    });
  });
});

router.get('/list', (req, res, next) => {
  User.find({}, _filter, (err, data) => {
    checkError(err);
    res.json({ code: 0, data });
  });
});

module.exports = router;
