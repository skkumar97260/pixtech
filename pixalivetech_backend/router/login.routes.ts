import { Router} from 'express'; 
import { basicAuthUser } from "../middleware/basicAuth";
import { checkQuery,checkRequestBodyParams } from "../middleware/validator";
import { checkSession } from "../utils/tokenManager";
import { adminLogin } from '../controller/login.controller';

const router : Router = Router();


router.post ('/adminLogin',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('password'),
    adminLogin);

export default router;