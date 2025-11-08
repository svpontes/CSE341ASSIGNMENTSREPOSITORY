//imports required
const express = require('express'); //import the framework express to create the server
const bodyParser = require('body-parser');//import module to analize the body requisition (JSON, etc)
const path = require('path');//import module path to deal with directories path
const mongodb = require('./backend/db/connect');//import the connect.js
const friendsRoutes = require('./backend/routes/app'); //import router to get 'friends' routes
const swaggerDocs = require('./backend/swagger/swagger');

const port = process.env.PORT || 8080; //define server port throuth env process variable or use 8080
const app = express();//main aplication. Instance of the express, app(object) Objective: starts (middlewares, static files, router, server)
                      //Need (module express and mongodb - to start the DB) and friendsRoutes to start the API


app.use(express.static(path.join(__dirname, 'frontend')));//Middleware: config the express to use static files (frontend)

app.get('/', (req, res) => {//route HTTP GET. provide service to HTML to frontend index.html
  res.sendFile(path.join(__dirname, 'frontend','index.html')); //path build the path for index.html
});

app.use(bodyParser.json());//allow express to read body requisitions JSON

app.use('/friends', friendsRoutes); //create the prefixe for URL /friends

swaggerDocs(app);
mongodb.initDb((err, mongodb) => { //manage the db conection
  if (err) {
    console.log('Db Initialization err: ' ,err);
  } else {
    app.listen(port, () =>{ //initiate the Express server listening to the port 
      console.log(`Connected to DB and listening on ${port}`);
    });
    
  }
});