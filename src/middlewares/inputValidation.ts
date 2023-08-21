import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Define Joi schema for domain validation
const domainSchema = Joi.string()
    .domain({ tlds: { allow: false } }) // Disallow top-level domains for strict domain structure
    .max(255) // Update the maximum length value according to your needs
    .required()
    .messages({
        'string.domain': 'Invalid domain format. Use "domainName.ending".',
        'string.max': 'Domain name must not exceed 255 characters.',
        'any.required': 'Domain is required.',
    });

// Validation middleware for domain input
export const validateGetDomainInput = (req: Request, res: Response, next: NextFunction) => {
    const { error: paramsError } = domainSchema.validate(req.params.domain);

    if (paramsError) {
        return res.status(400).json({ error: paramsError.details[0].message });
    }

    next();
};

// Validation middleware for domain input
export const validatePostDomainInput = (req: Request, res: Response, next: NextFunction) => {
    const { error: bodyError } = domainSchema.validate(req.body.domain);

    if (bodyError) {
        return res.status(400).json({ error: bodyError.details[0].message });
    }

    next();
};
