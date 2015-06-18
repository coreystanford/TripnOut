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
   }).select('_id name username password').exec(function(err, user) {
 
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
           token: token,
           id: user._id
         });
       }   
 
     }
 
   });
 });

  // -------------------------------------------- //
  // -------- ALLOWED ANONYMOUS REQUESTS -------- //
  // -------------------------------------------- //

  // ---- GET TRIPS / TRIP ---- //

  apiRouter.route('/trips')
   .get(function(req, res) {
    Trip.find(function(err, trips) {
      if (err) res.send(err);
      // return the trips
      res.json(trips);
    });
  });

  apiRouter.route('/trips/:trip_id')
  // get the trip with that id 
  .get(function(req, res) {
    Trip.findById(req.params.trip_id, function(err, trip) {
      if (err) res.send(err);
      // return that trip
      Trip.populate(trip, {path: 'author'}, function(err, trip){
        res.json(trip);
      });
    });
  });

  // ---------------------------- //
  // -------- MIDDLEWARE -------- //
  // ---------------------------- //

 // middleware to use for all requests
 apiRouter.use(function(req, res, next) {

   // check header or url parameters or post parameters for token
   var token = req.body.token || req.params.token || req.headers['x-access-token'];
 
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
 
  // ---- Create User ---- //

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

  // -------- Get / Update / Delete USER BY ID -------- //

 apiRouter.route('/users/:user_id')

  // get the user with that id 
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      // return that user
      User.populate(user, [{path: 'trips.trip'}, {path: 'tutorials.tutorial'}], function(err, user){
        res.json(user);
      });
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

  // ------------------------------- //
  // -------- GET USER INFO -------- //
  // ------------------------------- //

  // api endpoint to get user information
  apiRouter.get('/me', function(req, res) {
    res.send(req.decoded);
  });

  // ----------------------- //
  // -------- TRIPS -------- //
  // ----------------------- //

  // ---- Create Trip ---- //

  apiRouter.route('/trips')

  .post(function(req, res) {
    
    // create a new instance of the User model
    var trip = new Trip();    
 
    // set the users information (comes from the request)
    trip.title = req.body.title; 
    trip.description = req.body.description;
    trip.content = req.body.content;
    trip.author = req.body.author;
    trip.privacy = req.body.privacy;
 
    // save the user and check for errors
    trip.save(function(err) {
             if (err) {
                 // duplicate entry
                 if (err.code == 11000) 
                     return res.json({ success: false, message: 'A trip with that username already exists. '});
                 else 
                     return res.send(err);
             }
 
      //res.json({ message: 'Trip created!' });

    });

    // Add the trip to the array of trips associated with the User's account
    var newTrip = {
      trip: trip._id
    };

    User.findByIdAndUpdate(
        req.body.author,
        { $push: { trips: newTrip }},
        { safe: true, upsert: true },
        function(err, trip) {
            if (err) res.send(err);
            res.json({ message: 'User trip added!' });
        }
    );

  });

  // -------- Update / Delete Trip BY ID -------- //

 apiRouter.route('/trips/:trip_id')

  // update the trip with this id 
  .put(function(req, res) {
 
    // use our trip model to find the trip we want
    Trip.findById(req.params.trip_id, function(err, trip) {
      if (err) res.send(err);
 
      // update the trips info only if its new
      if (req.body.title) trip.title = req.body.title;
      if (req.body.description) trip.description = req.body.description;
      if (req.body.content) trip.content = req.body.content;
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

    Trip.find({ _id: req.params.trip_id }, function(err, trip) {

      User.findOneAndUpdate(
       { _id: trip[0].author },
       { $pull: { 'trips': { 'trip': trip[0]._id } } },function(err, user){

         if (err) return res.send(err);

         Trip.remove({
            _id: req.params.trip_id
         }, function(err, trip) {
           if (err) return res.send(err);
           
           res.json({ message: 'Successfully deleted' });
         });
  
       });
    
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
    if(req.body.trip_link) tutorial.trip_link = req.body.trip_link;  
    tutorial.content = req.body.content
    tutorial.date = new Date();
    tutorial.author = req.body.author;
    tutorial.approved = req.body.approved;
 
    tutorial.save(function(err) {
             if (err) {

                 if (err.code == 11000) 
                     return res.json({ success: false, message: 'A tutorial with that name already exists. '});
                 else 
                     return res.send(err);
             }
 
      //res.json({ message: 'Tutorial created!' });
    });
      
    console.log("**** " + tutorial._id + " ****" );  
    var newTutorial = {
      tutorial: tutorial._id
    };

    User.findByIdAndUpdate(
        req.body.author,
        { $push: { tutorials: newTutorial }},
        
        { safe: true, upsert: true },
        
        function(err, tutorial) {
            if (err) res.send(err);
            res.json({ message: 'User Tutorial added!' });
        }
    ); 

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
      Tutorial.populate(tutorial, {path: 'author'}, function(err, tutorial){
        res.json(tutorial);
      });
    });
  })

  .put(function(req, res) {
 
    Tutorial.findById(req.params.tutorial_id, function(err, tutorial) {
      if (err) res.send(err);
 
      if (req.body.title) tutorial.title = req.body.title;
      if (req.body.description) tutorial.description = req.body.description;
      if (req.body.participants) tutorial.participants = req.body.participants;
      if (req.body.trip_link) tutorial.trip_link = req.body.trip_link;    
      if (req.body.content) tutorial.content = req.body.content;
      if (req.body.author) tutorial.author = req.body.author;
      if (req.body.approved) tutorial.approved = req.body.approved;
 
      trip.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Tutorial updated!' });
      });
 
    });
  })

   .delete(function(req, res) {

    Tutorial.find({ _id: req.params.tutorial_id }, function(err, tutorial) {

      User.findOneAndUpdate(
       { _id: tutorial[0].author },
       { $pull: { 'tutorials': { 'tutorial': tutorial[0]._id } } },function(err, user){

         if (err) return res.send(err);

         Tutorial.remove({
            _id: req.params.tutorial_id
         }, function(err, tutorial) {
           if (err) return res.send(err);
           
           res.json({ message: 'Successfully deleted' });
         });
  
       });
    
    });
  
  });   

  return apiRouter;

 };