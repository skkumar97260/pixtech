import auth from 'basic-auth';
import { clientError } from '../helper/ErrorMessage';
import { Request, Response, NextFunction } from "express";

export let basicAuthUser = function (req: Request, res: Response, next: NextFunction): void {
    const credentials = auth(req);
    console.log('credentials', credentials);

    if (!credentials || credentials.name !== process.env.basicAuthUser || credentials.pass !== process.env.basicAuthKey) {
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.status(401).json({
            success: false,
            statusCode: 499,
            message: clientError.token.unauthRoute,
        });
        return; // ✅ Explicit return to ensure the function does not continue
    } 

    next(); // ✅ Ensures the function always returns void
};

export default { basicAuthUser };
