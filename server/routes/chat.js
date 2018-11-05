var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./users.db');
/* GET users listing. */
router.all('*', function (req, res, next) {
  if (req.cookies.user_id !== '') {
    db.get('SELECT * FROM users WHERE id = ?', [req.cookies.user_id], (err, r) => {
      console.log(err, r)
      if (r === undefined) {
        res.render('login', {
          msg: 'Please login before chatting.'
        });
      } else {
        next();
      }
    })
  }
});
router.get('/', (req, res) => {
  const username = req.cookies.username;
  res.render('chat', {
    username: username
  })
})
module.exports = router;
