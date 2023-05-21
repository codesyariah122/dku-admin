const formatSizesJson = (data) => {
  const checkSize = JSON.parse(data);
  return checkSize;
};

export default ({ app }, inject) => {
  inject("size", formatSizesJson);
};
