require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  /**
   * Port the app should run on
   */
  port: parseInt("5002") || 5050,

  /**
   * Database the app should connect to
   */

  /**
   * The secret sauce to validate JWT
   */

  /**
   * Used by Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
