/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		19/04/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0 
 * @require     express-validator
 * */
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