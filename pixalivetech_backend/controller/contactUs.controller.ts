import { Contact,ContactDocument } from "../model/contactUs.model";
import {response, sendEmail} from "../helper/commonResponseHandler";
import{errorMessage,clientError} from "../helper/ErrorMessage";
import{validationResult} from "express-validator";
import express, { Request, Response, NextFunction } from 'express';

var activity = "Contact";

/**
 * @author BalajiMurahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save contact cart
 */

export let saveContact = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const createContact: ContactDocument = req.body;
            const createData = new Contact(createContact);
            const insertData = await createData.save();
            const contact:any={
                name:insertData.name,
                email:insertData.email,
                mobileNumber:insertData.mobileNumber,
                subject:insertData.subject,
               message:insertData.message
            }
            await sendEmail(contact);
            response(req,res,activity,'Level-2','Save-Contact',true,200,insertData,clientError.success.savedSuccessfully);
        } catch (err:any){
            response(req,res,activity,'Level-3','Save-Contact',false,500,{},errorMessage.internalServer, err.message);
        }
    } else{
        response(req, res, activity,  'Level-3','Save-Contact', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all contact
 * 
 */
export let getAllUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = await Contact.find({isDeleted:false})
        response(req,res,activity,'Level-1','GetAll-User',true,200,data,clientError.success.fetchedSuccessfully)
     } catch(err:any){
        response(req,res,activity,'Level-3','GetAll-User',false,500,{},errorMessage.internalServer,err.message)
    }
}

   /**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get a single Users.
 */
   export let getSingleUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = await Contact.findById({_id:req.query._id})
        response(req,res,activity,'Level-1','Get-SingleUsers',true,200,userData,clientError.success.fetchedSuccessfully)
    } catch (err:any) {
        response(req, res, activity, 'Level-3', 'Get-SingleUsers', false, 500, {}, errorMessage.internalServer, err.message);
        
    }
}

/**
 * @author Balaji Murahari
 * @date 28-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to delete user .
 */

export let deletedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersData = await Contact.findByIdAndUpdate({_id:req.query._id},
            {$set:{isDeleted:true  }});
    response(req, res, activity, 'Level-2', 'Delete-Users', true, 200, usersData, clientError.success.deleteSuccess);
    } catch (error: any) {
        response(req, res, activity, 'Level-3', 'Delete-Users', false, 500, {}, errorMessage.internalServer, error.message);
    }
}

/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filtered Users.
 */

    