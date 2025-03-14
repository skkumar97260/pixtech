import  crypto from "crypto";
import  Config from "../config/Enviornment";
import  CryptoJS from "crypto-js";



let password="PixaliveService";
let conversionOutput:string;

/**
 * @author kaaviyan  
 * @date  09-02-2025
 * @description This function return password encryption.
 * @param {String} text
 */
export let hashPassword = async (text:any) => {
  return await new Promise((resolve, reject) => {
    const hash = crypto.createHmac("sha256", Config.SALT);
    hash.update(text.toString());
    resolve(hash.digest("hex"));
  });
};

/**
 * @author Mohanraj V / Santhosh
 * @date  22-09-2022
 * @description This function return decrypted item for given encryption using cryptojs
 * @param {String} encrypted
 */
export let encrypt = (textToConvert:any) => {
  return (conversionOutput = CryptoJS.AES.encrypt(
    textToConvert.trim(),
    password.trim()
  ).toString());
};

/**
 * @author kaaviyan 
 * @date  09-02-2025
 * @description This function return encrypted item for given string using cryptojs
 * @param {String} text
 */
export let decrypt = (textToConvert:any) => {
  return (conversionOutput = CryptoJS.AES.decrypt(
    textToConvert.trim(),
    password.trim()
  ).toString(CryptoJS.enc.Utf8));
};

export default {encrypt,decrypt,hashPassword};