const getRoles = (data) => {
  const checkRole = JSON.parse(data);
  const roles = checkRole[0].toString();
  return roles;
};

export default ({ app }, inject) => {
  inject("role", getRoles);
};
