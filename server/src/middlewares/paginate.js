module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit = 8, offset = 0 },
    } = req;
    req.pagination = {
      limit: parseInt(limit > 8 || limit <= 0 ? 8 : limit),
      offset: offset < 0 ? 0 : offset,
    };
    next();
  } catch (err) {
    next(err);
  }
};
