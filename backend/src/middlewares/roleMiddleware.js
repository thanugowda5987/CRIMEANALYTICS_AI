const ApiResponse = require('../utils/apiResponse');

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return ApiResponse.error(res, 403, 'Access denied: insufficient permissions');
    }
    next();
  };
};

module.exports = authorizeRoles;