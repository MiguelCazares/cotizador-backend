/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;

    return res.status(statusCode).json(payload);
  }

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
