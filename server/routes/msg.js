const router = require('express').Router();
const model = require('../db');
const Chat = model.getModel('chat');

const _filter = { pwd: 0, __v: 0 };

router.get('/list', (req, res, next) => {
  const { uid } = req.cookies;
  if (!uid) {
    return res.json({ code: 1, msg: '身份过期，请重新登录' });
  }
  Chat.find(
    {
      $or: [{ from: uid }, { to: uid }]
    },
    _filter,
    (err, data) => {
      if (err) {
        return res.json({ code: 1, msg: '服务器错误' });
      }
      return res.json({ code: 0, data });
    }
  );
});

module.exports = router;
