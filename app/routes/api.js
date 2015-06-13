 // load schemas
 var User     = require('../models/user.js');
 var Trip     = require('../models/trip.js');
 var Tutorial = require('../models/tutorial.js');

 // load configuration and tokens
 var config   = require('../../config');
 var jwt      = require('jsonwebtoken');

 // add to exports
 module.exports = function(app, express) {

  // get an instance of the express router
  var apiRouter = express.Router();
  
  // -------------------------------- //
  // -------- AUTHENTICATION -------- //
  // -------------------------------- //

  apiRouter.post('/authenticate', function(req, res) {
 
   // find the user
   // select the name username and password explicitly
   User.findOne({
     username: req.body.username
   }).select('name username password').exec(function(err, user) {
 
     if (err) throw err;
 
     // no user with that username was found
     if (!user) {
       res.json({ 
         success: false, 
         message: 'Authentication failed. User not found.' 
       });
     } else if (user) {
 
       // check if password matches
       var validPassword = user.comparePassword(req.body.password);
       if (!validPassword) {
         res.json({ 
           success: false, 
           message: 'Authentication failed. Wrong password.' 
         });
       } else {
 
         // if user is found and password is right
         // create a token
         var token = jwt.sign({
                     name: user.name,
                     username: user.username
                    }, config.secret, {
                     expiresInMinutes: 1440 // expires in 24 hours
                    });
 
         // return the information including token as JSON
         res.json({
           success: true,
           message: 'Enjoy your token!',
           token: token
         });
       }   
 
     }
 
   });
 });

  // ---------------------------- //
  // -------- MIDDLEWARE -------- //
  // ---------------------------- //

 // middleware to use for all requests
 apiRouter.use(function(req, res, next) {

   // check header or url parameters or post parameters for token
   var token = req.body.token || req.param('token') || req.headers['x-access-token'];
 
   // decode token
   if (token) {
 
     // verifies secret and checks exp
     jwt.verify(token, config.secret, function(err, decoded) {      
       if (err) {
         return res.status(403).send({ 
             success: false, 
           message: 'Failed to authenticate token.' 
         });    
       } else {
         // if everything is good, save to request for use in other routes
         req.decoded = decoded;   
 
         next();
 
       } 
     });
 
   } else {
 
     // if there is no token
     // return an HTTP response of 403 (access forbidden) and an error message
     return res.status(403).send({ 
       success: false, 
       message: 'No token provided.' 
     });
     
   }
 
  });

  // ----------------------- //
  // -------- USERS -------- //
  // ----------------------- //
 
  apiRouter.route('/users')

 	.post(function(req, res) {
 		
 		// create a new instance of the User model
 		var user = new User(); 		
 
 		// set the users information (comes from the request)
 		user.name = req.body.name;  
 		user.username = req.body.username;
 		user.password = req.body.password;
 
 		// save the user and check for errors
 		user.save(function(err) {
             if (err) {
                 // duplicate entry
                 if (err.code == 11000) 
                     return res.json({ success: false, message: 'A user with that\
  username already exists. '});
                 else 
                     return res.send(err);
             }
 
 			res.json({ message: 'User created!' });
 		});

  })

 	.get(function(req, res) {
 		User.find(function(err, users) {
 			if (err) res.send(err);
 			// return the users
 			res.json(users);
 		});
 	});

  // -------- USER BY ID -------- //

 apiRouter.route('/users/:user_id')
 
  // get the user with that id 
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      // return that user
      res.json(user);
    });
  })

  // update the user with this id 
  .put(function(req, res) {
 
    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
 
      // update the users info only if its new
      if (req.body.name) user.name = req.body.name;
      if (req.body.username) user.username = req.body.username;
      if (req.body.password) user.password = req.body.password;
 
      // save the user
      user.save(function(err) {
        if (err) res.send(err);
        // return a message
        res.json({ message: 'User updated!' });
      });
 
    });
  })

  // delete the user with this id 
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) return res.send(err);
 
      res.json({ message: 'Successfully deleted' });
    });
  });

  // api endpoint to get user information
  apiRouter.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  // ----------------------- //
  // -------- TRIPS -------- //
  // ----------------------- //

  apiRouter.route('/trips')

  .post(function(req, res) {
    
    // create a new instance of the User model
    var trip = new Trip();    
 
    // set the users information (comes from the request)
    trip.title = req.body.title; 
    trip.description = req.body.description;
    for (var i = 0; i <= req.body.content.length(); i++) {
          push(trip.content, req.body.content[i]);
        };
    trip.privacy = req.body.privacy;
 
    // save the user and check for errors
    trip.save(function(err) {
             if (err) {
                 // duplicate entry
                 if (err.code == 11000) 
                     return res.json({ success: false, message: 'A trip with that\
  username already exists. '});
                 else 
                     return res.send(err);
             }
 
      res.json({ message: 'Trip created!' });
    });

  })

  .get(function(req, res) {
    Trip.find(function(err, trips) {
      if (err) res.send(err);
      // return the trips
      res.json(trips);
    });
  });

  // -------- Trip BY ID -------- //

 apiRouter.route('/trips/:trip_id')
 
  // get the trip with that id 
  .get(function(req, res) {
    Trip.findById(req.params.trip_id, function(err, trip) {
      if (err) res.send(err);
      // return that trip
      res.json(trip);
    });
  })

  // update the trip with this id 
  .put(function(req, res) {
 
    // use our trip model to find the trip we want
    Trip.findById(req.params.trip_id, function(err, trip) {
      if (err) res.send(err);
 
      // update the trips info only if its new
      if (req.body.title) trip.title = req.body.title;
      if (req.body.description) trip.description = req.body.description;
      if (req.body.content) {
        for (var i = 0; i <= req.body.content.length(); i++) {
          push(trip.content, req.body.content[i]);
        };
      }
      if (req.body.privacy) trip.privacy = req.body.privacy;
 
      // save the trip
      trip.save(function(err) {
        if (err) res.send(err);
        // return a message
        res.json({ message: 'User updated!' });
      });
 
    });
  })

  // delete the trip with this id 
  .delete(function(req, res) {
    Trip.remove({
      _id: req.params.trip_id
    }, function(err, trip) {
      if (err) return res.send(err);
 
      res.json({ message: 'Successfully deleted' });
    });
  });
     
  // ---------------------- //
  // ------- TUTORIAL ----- //
  // ---------------------- //

  apiRouter.route('/tutorials')

  .post(function(req, res) {
    
    var tutorial = new Tutorial();    
 
    tutorial.title = req.body.title; 
    tutorial.description = req.body.description;
    tutorial.participants = req.body.participants;
    if(req.body.story_link) tutorial.story_link = req.body.story_link;  
    tutorial.content = [{
        type: String,
        data: [{
            title: String,
            input: String
        }]
    }],
    tutorial.date = new Date();  
    tutorial.approved = req.body.approved;
 
    tutorial.save(function(err) {
             if (err) {

                 if (err.code == 11000) 
                     return res.json({ success: false, message: 'A tutorial with that name already exists. '});
                 else 
                     return res.send(err);
             }
 
      res.json({ message: 'Tutorial created!' });
    });

  })

  .get(function(req, res) {
    Tutorial.find(function(err, tutorials) {
      if (err) res.send(err);

      res.json(tutorials);
    });
  });

  // -------- Tutorial BY ID -------- //

 apiRouter.route('/tutorials/:tutorial_id')
 
  .get(function(req, res) {
    Tutorial.findById(req.params.tutorial_id, function(err, tutorial) {
      if (err) res.send(err);
        
      res.json(tutorial);
    });
  })

  .put(function(req, res) {
 
    Tutorial.findById(req.params.tutorial_id, function(err, tutorial) {
      if (err) res.send(err);
 
      if (req.body.title) tutorial.title = req.body.title;
      if (req.body.description) tutorial.description = req.body.description;
      if (req.body.participants) tutorial.participants = req.body.participants;
      if (req.body.story_link) tutorial.story_link = req.body.story_link;    
      if (req.body.content) {
        for (var i = 0; i <= req.body.content.length(); i++) {
          push(tutorial.content, req.body.content[i]);
        };
      }
      if (req.body.author) tutorial.author = req.body.author;
      if (req.body.approved) tutorial.approved = req.body.approved;
 
      trip.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Tutorial updated!' });
      });
 
    });
  })

  .delete(function(req, res) {
    Tutorial.remove({
      _id: req.params.tutorial_id
    }, function(err, tutorial) {
      if (err) return res.send(err);
 
      res.json({ message: 'Successfully Deleted' });
    });
  });     

  return apiRouter;

 };