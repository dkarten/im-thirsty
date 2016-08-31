import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './app/models/user'

const app = express();
const saltRounds = 10;

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicDir = path.resolve(__dirname, 'public');

app.use(express.static(publicDir));

mongoose.connect('mongodb://localhost:27017');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

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
      })


router.get('/', (req,res,next) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

app.listen(port);
