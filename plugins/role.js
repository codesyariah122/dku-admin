/**
 * @param {objectParse}
 * @returns {Object}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

const getRoles = (data) => {
  const checkRole = JSON.parse(data);
  const roles = checkRole[0].toString();
  return roles;
};

export default ({ app }, inject) => {
  inject("role", getRoles);
};
