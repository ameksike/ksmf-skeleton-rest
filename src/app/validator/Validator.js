const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 'INVALID_PARAMETERS',
            errors: errors.array()
        });
    }
    return next();
};

module.exports = validate;