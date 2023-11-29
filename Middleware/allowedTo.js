const appError = require("../utils/appError");

module.exports = (...roles) => {
  //we use ... to put the value in an array , ["ADMIN" , "MANAGER"]

  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.creat("This role is not authorized", 401));
    }
    next();
  };
};
