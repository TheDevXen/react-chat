var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('req', req.cookies.user_id === undefined)
  let isLogged = false;
  if (req.cookies.user_id !== undefined)// || req.cookies.user_id.length > )
    isLogged = true;
  res.render('index', {
    isLogged: isLogged
  });
});
router.get('/register', function (req, res, next) {
  res.render('register', {});
});
router.get('/login', function (req, res, next) {
  res.render('login', {});
});



module.exports = router;
