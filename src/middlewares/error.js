const error = (error, req, res, next) => {
  return res.status(error.code || 400).send({ error: error.message });
};

module.exports = error;
