import {Router} from "express";
const router:Router = Router();
import { saveContact,getAllUser,getSingleUsers,deletedUsers } from "../controller/contactUs.controller";
import { basicAuthUser } from "../middleware/basicAuth";
import { checkQuery,checkRequestBodyParams } from "../middleware/validator";
import { checkSession } from "../utils/tokenManager";

router.post('/', //save contact  // without checking session
    basicAuthUser,
    saveContact
)

router.get('/', //get all contact   
    basicAuthUser,
    checkSession,
    getAllUser
);  

router.get('/getSingleUser',  //get single user   
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    getSingleUsers
);

router.delete ('/',  //delete users',
    basicAuthUser,
    checkSession,
    checkQuery('_id'),
    deletedUsers
);




export default router;
