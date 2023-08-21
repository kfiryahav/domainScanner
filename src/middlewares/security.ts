import helmet from 'helmet';
require('dotenv').config();

export const securityMiddleware = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
    ],
  }
});

export const xssFilter = helmet.xssFilter();
