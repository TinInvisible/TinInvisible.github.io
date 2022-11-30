const { imgSrc } = require('./Data');

exports.getAll = () => {
  return imgSrc;
};

exports.getByPage = (page) => {
  return imgSrc.find((img_src) => img_src.page === page);
};
