const { validationResult } = require('express-validator');

const validate = validations => {
    return async (req, res, next) => {
        try {
            for (const validation of validations) {
                const result = await validation.run(req);
                if (!result.isEmpty() && !validationResult(req).isEmpty()) {
                    return res.status(400).json({ errors: result.array()[0], message: result.array()[0].msg, success: false, status: 400 });
                }
            }
            next();
        } catch (error) {
            console.error("Validation error:", error);
            return res.status(500).json({ message: 'Internal server error', success: false, status: 500 });            
        }
    };
};

module.exports = validate;