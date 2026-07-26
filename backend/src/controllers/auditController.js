const AuditLog = require('../models/AuditLog');
const ApiResponse = require('../utils/apiResponse');

const logAction = async ({ userId, action, module, targetId, details, ipAddress }) => {
  await AuditLog.create({ user: userId, action, module, targetId, details, ipAddress });
};

const getAuditLogs = async (req, res, next) => {
  try {
    const { module, user, page = 1, limit = 30 } = req.query;

    const filter = {};
    if (module) filter.module = module;
    if (user) filter.user = user;

    const logs = await AuditLog.find(filter)
      .populate('user', 'name badgeNumber role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await AuditLog.countDocuments(filter);

    return ApiResponse.success(res, 200, 'Audit logs fetched successfully', {
      logs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { logAction, getAuditLogs };