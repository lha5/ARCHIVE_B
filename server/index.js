const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world');
  // res.redirect('http://localhost:3000');
});

app.use('/cbm/api/user', require('./routes/user'));
app.use('/cbm/api/recipe', require('./routes/recipe'));

const sequelize = require('./models/index').sequelize;
sequelize.sync();

// error handler function
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/upload', express.static('upload'));

const PORT = 5000;

app.listen(PORT);
console.log(`CBM is running on http://localhost:${PORT}`);

module.exports = app;