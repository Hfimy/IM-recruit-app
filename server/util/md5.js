const utility = require('utility');

module.exports = pwd => {
  const salt = 'hfimy!@#$*&^jfdaijdfafajkls';
  return utility.md5(utility.md5(salt + pwd));
};
