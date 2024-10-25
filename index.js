const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

//set middleware to allow receive json data
app.use(express.json());

//set the routers to the app
routerApi(app);

//initialize the app
app.listen(port, () =>{
  console.log("My port: " + port);
});
