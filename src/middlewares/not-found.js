const notFound = (req, res) => {
  res.status(404).send({ error: "not found!" });
};

module.exports = notFound;
