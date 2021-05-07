function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results = {};

    const count = await model.countDocuments().exec();

    results.limit = limit;

    results.total = {
      items: count,
      pages: Math.ceil(count / limit),
    };

    if (endIndex < count) {
      results.next = {
        page: page + 1,
      };
    }

    if (count > 0) {
      if (startIndex > 0 && page <= results.total.pages) {
        results.previous = {
          page: page - 1,
        };
      } else if (page > results.total.pages) {
        results.previous = results.total.page;
      }
    }

    try {
      results.results = await model
        .find()
        .sort({ productName: 1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
}

module.exports = { paginatedResults };
