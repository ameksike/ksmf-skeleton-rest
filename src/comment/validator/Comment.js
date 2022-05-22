const { check, body, checkSchema } = require('express-validator');
const run = require('../../app/validator/Validator');
/**
 * For more information on validations see the link below:
 *  https://express-validator.github.io/docs/schema-validation.html
 */

const fieldOptional = {
    tags: {
        custom: {
            errorMessage: 'tags must be an array of tag id',
            options: (value, { req, location, path }) => {
                return !value || value instanceof Array;
            }
        }
    },
    date: {
        errorMessage: 'date field must be date format',
        isDate: true,
        optional: true
    }
};

const fieldRequired = {
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
    }
};

module.exports = {
    all: [
        checkSchema({
            ...fieldRequired,
            ...fieldOptional
        }),
        run
    ],
    optional: [
        checkSchema({
            ...fieldOptional
        }),
        run
    ]
}