"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssFilter = exports.securityMiddleware = void 0;
const helmet_1 = __importDefault(require("helmet"));
require('dotenv').config();
exports.securityMiddleware = helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
            "'self'",
        ],
    }
});
exports.xssFilter = helmet_1.default.xssFilter();
