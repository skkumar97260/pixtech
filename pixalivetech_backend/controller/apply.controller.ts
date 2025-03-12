import { Apply,ApplyDocument } from "../model/apply.model";
import {response, sendEmail} from "../helper/commonResponseHandler";
import{errorMessage,clientError} from "../helper/ErrorMessage";
import{validationResult} from "express-validator";
import express, { Request, Response, NextFunction } from 'express';

var activity = "Apply";

/**
 * @author BalajiMurahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to save Apply cart
 */

export let saveApply = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try{
            const createApply: ApplyDocument = req.body;
            const createData = new Apply(createApply);
            const insertData = await createData.save();
            response(req,res,activity,'Level-2','Save-Apply',true,200,insertData,clientError.success.savedSuccessfully);
        } catch (err:any){
            response(req,res,activity,'Level-3','Save-Apply',false,500,{},errorMessage.internalServer, err.message);
        }
    } else{
        response(req, res, activity,  'Level-3','Save-Apply', false, 422, {}, errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
}



/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get all Apply
 * 
 */
export let getAllApply = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const data = await Apply.find({isDeleted:false})
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
 * @description This Function is used to get a single Apply.
 */
   export let getSingleApply = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = await Apply.findById({_id:req.query._id})
        response(req,res,activity,'Level-1','Get-SingleApply',true,200,userData,clientError.success.fetchedSuccessfully)
    } catch (err:any) {
        response(req, res, activity, 'Level-3', 'Get-SingleApply', false, 500, {}, errorMessage.internalServer, err.message);
        
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

export let deletedApply = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ApplyData = await Apply.findByIdAndUpdate({_id:req.query._id},
            {$set:{isDeleted:true  }});
    response(req, res, activity, 'Level-2', 'Delete-Apply', true, 200, ApplyData, clientError.success.deleteSuccess);
    } catch (error: any) {
        response(req, res, activity, 'Level-3', 'Delete-Apply', false, 500, {}, errorMessage.internalServer, error.message);
    }
}

/**
 * @author Balaji Murahari
 * @date 30-10-2023
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next  
 * @description This Function is used to get filtered Apply.
 */
