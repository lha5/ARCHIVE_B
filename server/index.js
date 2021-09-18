const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const morgan = require('morgan');
const { logger } = require('./configs/winston');
const mongoose = require('mongoose');

app.use(express.json());

app.use(cors());

app.use(helmet());

mongoose
  .connect(process.env.MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('MongoDB is connected.'))
  .catch((error) => logger.error('MongoDB connecting got ERROR \n', error));

// logging
app.use(
  morgan(
    'HTTP/:http-version :remote-addr :remote-user :method :url :status :response-time ms - :res[content-length] :referrer :user-agent :response-time ms',
    {
      stream: { write: (message) => logger.info(message.trim()) },
    }
  )
);

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/comment', require('./routes/comment'));

// error handler function
app.use((error, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err);
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {};

  logger.error(apiError.message);

  // render the error page
  return response(
    res,
    { message: apiError.message },
    apiError.status
  );
});

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = 5000;

app.listen(PORT, () => {
  logger.info(`App is running on http://localhost:${PORT} as ${process.env.NODE_ENV} mode.`);
});
