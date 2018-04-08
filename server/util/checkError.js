module.exports = err => {
  if (err) {
    return res.json({ code: 1, msg: '服务器错误' });
  }
};
