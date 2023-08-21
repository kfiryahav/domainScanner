"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostDomainInput = exports.validateGetDomainInput = void 0;
const joi_1 = __importDefault(require("joi"));
// Define Joi schema for domain validation
const domainSchema = joi_1.default.string()
    .domain({ tlds: { allow: false } }) // Disallow top-level domains for strict domain structure
    .max(255) // Update the maximum length value according to your needs
    .required()
    .messages({
    'string.domain': 'Invalid domain format. Use "domainName.ending".',
    'string.max': 'Domain name must not exceed 255 characters.',
    'any.required': 'Domain is required.',
});
// Validation middleware for domain input
const validateGetDomainInput = (req, res, next) => {
    const { error: paramsError } = domainSchema.validate(req.params.domain);
    if (paramsError) {
        return res.status(400).json({ error: paramsError.details[0].message });
    }
    next();
};
exports.validateGetDomainInput = validateGetDomainInput;
// Validation middleware for domain input
const validatePostDomainInput = (req, res, next) => {
    const { error: bodyError } = domainSchema.validate(req.body.domain);
    if (bodyError) {
        return res.status(400).json({ error: bodyError.details[0].message });
    }
    next();
};
exports.validatePostDomainInput = validatePostDomainInput;
