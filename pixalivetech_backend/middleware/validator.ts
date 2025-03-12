const { check, param, query } = require('express-validator');
import { ErrorMessage } from '../helper/ErrorMessage';
import { body } from 'express-validator';



/**
 * @author Mohanraj V / Santhosh
 * @date  07-09-2023
 * @description Function to check for the Validation of Query
 * @param {string} id
 * @param {boolean} isRequired
 */

export let checkQuery = (id:any) => {
    return query(id, ErrorMessage.id.required).isLength({ min: 1 })
        .trim()
        .exists()
}

/**
 * @author Mohanraj V / Santhosh
 * @date  07-09-2023
 * @description Function to check for the Validation of Params
 * @param {string} id
 * @param {boolean} isRequired
 */

export let checkParam = (id:any) => {
    return param(id, ErrorMessage.id.required)
        .trim()
        .exists()
}

/**
 * @author M0hanraj V / Santhosh
 * @date  22-09-2023
 * @description Function to check for the Validation of boady arguments
 * @param {string} val
 * @param {boolean} isRequired
 */
export let checkRequestBodyParams = (val:any) => {
    return body(val, ErrorMessage.general.required).isLength({ min: 1 })
        .trim()
        .exists().withMessage(ErrorMessage.general.required)
}

export default { checkQuery, checkParam, checkRequestBodyParams };