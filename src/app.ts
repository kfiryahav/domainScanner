import express from 'express';
import path from 'path';
import cors from 'cors';
require('./services/db.connection');
require('dotenv').config();

import indexRouter from './routes/index';
import domainsRouter from './routes/domains';
import { start } from './services/unscannedDomainsScheduler';
import { securityMiddleware, xssFilter, rateLimiter } from './middlewares/security';

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(xssFilter, securityMiddleware, rateLimiter)
app.use('/', indexRouter);
app.use('/domains', domainsRouter);


app.listen(3000, () => {
    console.log('Server is now running on port 3000 ✅');
});

// Start the scheduler
start();


export default app;
