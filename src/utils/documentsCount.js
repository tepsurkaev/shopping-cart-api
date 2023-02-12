module.exports.documentsCount = (collection, limit) => {
  const collectionCount = collection.length;
  const totalPages = Math.ceil(collectionCount / limit);

  return {
    collectionCount,
    totalPages
  };
};
