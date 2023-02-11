module.exports.documentsCount = async (model, limit) => {
  const collectionCount = await model.find().countDocuments();
  const totalPages = Math.ceil(collectionCount / limit);

  return {
    collectionCount,
    totalPages
  };
};
