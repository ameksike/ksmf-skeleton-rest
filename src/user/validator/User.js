const { checkSchema } = require('express-validator');
const run = require('../../app/validator/Validator');
/**
 * For more information on validations see the link below:
 *  https://express-validator.github.io/docs/schema-validation.html
 */

module.exports = {
    all: [
        checkSchema({
            name: {
                errorMessage: 'name is required and must be string',
                isString: true,
                isEmpty: false,
                customSanitizer: {
                    options: (value, { req, location, path }) => {
                        return (value || '').trim();
                    },
                },
            },
            age: {
                errorMessage: 'age is required and must be integer',
                optional: false,
                isInt: true
            }
        }),
        run
    ]
}