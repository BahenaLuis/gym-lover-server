const express = require('express');
const routerApi = require('./routes');
const cors = require('cors')

const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

//set middleware to allow receive json data
app.use(express.json());

//allowed origins
const whitelist = [];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  }
}
app.use(cors(options));

//set the routers to the app
routerApi(app);

//add middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//initialize the app
app.listen(port, () =>{
  console.log("My port: " + port);
});
