const { checkSchema } = require('express-validator');
const run = require('../../app/validator/Validator');
/**
 * For more information on validations see the link below:
 *  https://express-validator.github.io/docs/schema-validation.html
 */

const UserSchema = {
    firstName: {
        errorMessage: 'First Name is required and must be string',
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
};
const insert = [checkSchema(UserSchema), run];

UserSchema.firstName.optional = true;
const update = [checkSchema(UserSchema), run];

module.exports = {
    insert, update
}