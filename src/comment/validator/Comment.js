const { check, body, checkSchema } = require('express-validator');
const run = require('../../app/validator/Validator');
/**
 * For more information on validations see the link below:
 *  https://express-validator.github.io/docs/schema-validation.html
 */
module.exports = {
    all: [
        checkSchema({
            comment: {
                isLength: {
                    errorMessage: 'should be at least 7 chars long',
                    options: { min: 5, max: 200 },
                }
            },
            userId: {
                isInt: {
                    errorMessage: 'userId is required and must be an integer value',
                    if: value => {
                        return value !== '';
                    }
                }
            },
            flightId: {
                isInt: {
                    errorMessage: 'flightId is required and must be an integer value',
                    if: value => {
                        return value !== '';
                    }
                }
            },
        }),
        run
    ]
}