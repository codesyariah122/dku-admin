/**
 * @param {objectParse}
 * @returns {Object}
 * @author Puji Ermanto <puji.ermanto@gmail.com>
 */

const getRoles = (data) => {
  if(data.length > 0) {  
    const checkRole = JSON.parse(data);
    const roles = checkRole[0].toString();
    return roles;
  } else {
    return null;
  }
};

export default ({ app }, inject) => {
  inject("role", getRoles);
};
