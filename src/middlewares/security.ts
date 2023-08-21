import helmet from 'helmet';
require('dotenv').config();
import rateLimit from 'express-rate-limit';

export const securityMiddleware = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
    ],
  }
});


export const rateLimiter = rateLimit({
	windowMs: 60 * 1000,
	max: 15,
	standardHeaders: true,
	legacyHeaders: false,
	message: JSON.stringify({ statusCode: 500, message: 'exceeded rate limit.' }),
})

export const xssFilter = helmet.xssFilter();
