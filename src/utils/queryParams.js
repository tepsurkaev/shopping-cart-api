module.exports.queryParams = (from, to, category, subcategory, searchQuery) => {
  const searchPattern = searchQuery ? new RegExp(searchQuery, 'i') : '';
  const query = {};

  if (searchQuery) {
    query.name = { $regex: searchPattern };
  }

  if (category) {
    query.category = category;
  }

  if (subcategory) {
    query.subcategory = subcategory;
  }

  if (from && to) {
    query.price = { $gte: from, $lte: to };
  } else if (from) {
    query.price = { $gte: from };
  } else if (to) {
    query.price = { $lte: to };
  }

  return query;
};
