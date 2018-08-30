/**
 * function to create pagination data
 * @param {number} limit
 * @param {number} offset
 * @param {number} totalCount
 */
const pagination = (limit, offset, totalCount) => {
  const lim = parseInt(limit, 10);
  const off = parseInt(offset, 10);
  const tCount = parseInt(totalCount, 10);
  if (!Number.isInteger(lim) || !Number.isInteger(off)
    || !Number.isInteger(tCount)) {
    return {};
  }
  return {
    totalCount: tCount,
    limit: lim,
    offset: off,
    totalPages: Math.ceil(tCount / lim),
    pageNum: Math.ceil(off / lim) + 1,
  };
};

export default pagination;
