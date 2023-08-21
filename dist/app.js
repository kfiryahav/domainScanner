"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require('./services/db.connection');
require('dotenv').config();
const index_1 = __importDefault(require("./routes/index"));
const domains_1 = __importDefault(require("./routes/domains"));
const unscannedDomainsScheduler_1 = require("./services/unscannedDomainsScheduler");
const security_1 = require("./middlewares/security");
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(security_1.xssFilter, security_1.securityMiddleware);
app.use('/', index_1.default);
app.use('/domains', domains_1.default);
app.listen(3000, () => {
    console.log('Server is now running on port 3000 ✅');
});
// Start the scheduler
(0, unscannedDomainsScheduler_1.start)();
exports.default = app;
