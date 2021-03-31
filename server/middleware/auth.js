const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

let auth = (req, res, next) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(' ')[1];
    
    jwt.verify(token, process.env.SECRET_TOKEN, async function(err, decode) {
      if (err) throw err;

      const query = `SELECT *
                     FROM cbm.user
                     WHERE id = ${decode.id} AND token = '${token}'`;

      const [results, metadata] = await sequelize.query(query);

      if (metadata) {
        req.token = token;
        req.user = metadata[0];
      } else {
        return res.json({ isAuth: false, error: true });
      }

      next();
    });
  } else {
    console.log('받은 토큰이 없음');
    
    return res.json({ isAuth: false, error: true });
  }
};

module.exports = { auth };
