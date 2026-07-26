const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/apiResponse');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const logger = require('../utils/logger');

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, badgeNumber, department, station } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, 409, 'User with this email already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      badgeNumber,
      department,
      station,
    });

    const token = generateToken(user._id);

    return ApiResponse.success(res, 201, 'User registered successfully', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return ApiResponse.error(res, 401, 'Invalid email or password');
    }

    if (!user.isActive) {
      return ApiResponse.error(res, 403, 'Account is deactivated');
    }

    const token = generateToken(user._id);
    logger.info(`User logged in: ${user.email}`);

    return ApiResponse.success(res, 200, 'Login successful', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    return ApiResponse.success(res, 200, 'Profile fetched successfully', { user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };