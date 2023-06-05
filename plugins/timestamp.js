/**
 * @param {dateString}
 * @returns {datetime}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

const timeStamp = (data) => {
  const dateObj = new Date(data);
  const timestamp = dateObj.getTime() / 1000;
  return timestamp
};

export default ({ app }, inject) => {
  inject("timestamp", timeStamp);
};
