const router = require('express').Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.json({
    code: 0,
    data: []
  });
});

module.exports = router;
