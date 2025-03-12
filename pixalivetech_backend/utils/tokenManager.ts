import  jwt from 'jsonwebtoken';
import { response } from '../helper/commonResponseHandler';
import { clientError, errorMessage } from '../helper/ErrorMessage';
import { Request, Response, NextFunction } from 'express';
const activity = 'token';

/**
 * @author Mohanraj V
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to token creation
 */

export let CreateJWTToken = (data: any = {}) => {
    let tokenData:any = {};
    if (data.id) tokenData.id = data.id;
    if (data.email) tokenData.email = data.email;

    return jwt.sign(tokenData, 'PixaliveTech', { expiresIn: '365d' });
}



/**
 * @author Mohanraj V
 * @date 10-01-2024
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to Chech the session and Verify the token
 */
export let checkSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['token'] as string;
    
    if (token) {
        const headerType = token.split(' ')[0]; // Don't change
        const tokenValue = token.split(' ')[1].trim(); // Don't change

        if (headerType.trim() === "Bearer") {
            try {
                jwt.verify(tokenValue, 'PixaliveTech', function (err: any, tokendata: any) {
                    if (err) {
                        return res.status(400).json({ message: clientError.token.sessionExpire });
                    }
                    if (tokendata) {
                        console.log('tokendata', tokendata);
                        req.body.loginId = tokendata.userId;
                        req.body.loginUserName = tokendata.userName;
                        req.body.createdBy = tokendata.userName;
                        req.body.createdOn = new Date();
                        req.body.modifiedBy = tokendata.userName;
                        req.body.modifiedOn = new Date();
                        return next();
                    }
                });
            } catch (err: any) {
              return response(req, res, activity, 'Check-Session','Level-3',  false, 499, {}, clientError.token.unauthRoute, err.message);
            }
        }
    } else {
      return response(req, res, activity, 'Check-Session','Level-3',  false, 499, {}, clientError.token.unauthRoute);
        
    }
};

export default { CreateJWTToken, checkSession }
