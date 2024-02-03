require("dotenv").config();
const express = require("express");
const { handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors } = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");
const handlebars = require('express-handlebars');

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morganMiddleware);

// Swagger
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swagger/swaggerSpec');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

// // Routes
app.use("/api/users", require("./routes/userRoutes"));
// add post routes
app.use("/api/posts", require("./routes/postRoutes"));
// add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));
// add like routes
app.use("/api/likes", require("./routes/likeRoutes"));

app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/layouts',
  defaultLayout: "main",
  extname: "hbs"
}));
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('main', {layout : 'index'});
});

// Add error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  Logger.debug(`Example app listening on port ${port}!`);
});
