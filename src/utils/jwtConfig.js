const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const { TOKEN_SECRET, TOKEN_EXPIRES } = require('../configs');

const generateToken = async (payload) => {
  const TOKEN_EXPIRES_INT = parseInt(TOKEN_EXPIRES, 10);

  const token = await jwt.sign(
    { ...payload },
    TOKEN_SECRET,
    { expiresIn: `${TOKEN_EXPIRES_INT}h` },
  );

  const date = DateTime.local().plus({ hours: TOKEN_EXPIRES_INT });

  const tokenData = {
    token,
    expiresIn: date.toISO(),
  };

  return tokenData;
};

const verifyToken = async (token) => {
  const decodedToken = await jwt.verify(token, TOKEN_SECRET);

  return decodedToken;
};

module.exports = {
  generateToken,
  verifyToken,
};
