import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './app/models/user';

const app = express();
const saltRounds = 10;

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? 3000 : process.env.PORT;
const publicDir = path.resolve(__dirname, 'public');

app.use(express.static(publicDir));

mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

// We only want to run the workflow when not in production
if (isDevelopment) {
  const compiler = webpack(config);
    const middleware = webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
      res.end();
    });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

router.use((req,res,next) => {
  console.log("Something is happening!");
  next();
});

router.route('/users')
      .post((req, res) => {
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        //console.log(JSON.stringify(req));
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            console.log(JSON.stringify(user));
            user.save((err) => {
              if (err) {
                res.send(err);
              }
              res.json({message:"user created!"});
            })
        });
      })
      .get((req, res) => {
        User.find((err, users) => {
          if (err) {
            res.send(err);
          }

          res.json(users);
        })
      });

router.route('/users/:user_id')
      .get((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
          if (err) {
            res.send(err);
          }
          res.json(user);
        })
      })
      .put((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
          if (err) {
            res.send(err)
          }
          user.username = req.body.username;
          user.email = req.body.email;
          //user.

        })
      })

router.get('/', (req,res,next) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
