var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var SOCKET_PORT = process.env.PORT || 3001;

server.listen(SOCKET_PORT, () => {
  console.log('Server listening at port %d', SOCKET_PORT);
});

require('./socket.js')(io);


var indexRouter = require('./routes/index');
var chatRouter = require('./routes/chat');



var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./users.db');
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users(id TEXT, username TEXT PRIMARY KEY, email TEXT, password TEXT);')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/', indexRouter);
app.use('/chat', chatRouter)
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username.match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/))
    return res.json({ msg: 'Invalid username' })
  db.run('INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)', [uuidv1(), username, email, password], (err, r) => {
    if (err === null) {
      res.json({
        msg: 'Successfully Created Account',
        success: true
      })
    }
    else if (err.errno === 19) {
      res.json({
        msg: 'Username already taken.'
      })
    } else {
      console.log(err)
      res.json({
        msg: 'Something went wrong.'
      })
    }
  })
});

app.post('/login', (req, res) => {
  console.log("incmonig req")
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, r) => {
    if (r === undefined) {
      res.json({
        msg: 'Invalid Credentials'
      });
    } else {
      res.json({
        success: true,
        user_id: r.id
      })
    }
  })
})

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
