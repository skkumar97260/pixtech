import { Router } from "express";
const router:Router = Router();
import {  getAdmin} from "../controller/admin.controller";
import { basicAuthUser } from "../middleware/basicAuth";
import { checkQuery,checkRequestBodyParams } from "../middleware/validator";
import { checkSession } from "../utils/tokenManager";

router.get('/', //get all user
    basicAuthUser,
    checkSession,
    getAdmin
);

router.get('/getSingleAdmin', //get all user
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getAdmin
);



export default router;