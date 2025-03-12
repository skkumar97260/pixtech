import { saveLog } from "../controller/logs.controller";
import { LogsDocument, Logs } from "../model/logs.model";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
dotenv.config();

export const response = (
    req: Request,
    res: Response,
    activity: string,
    level: string,
    method: string,
    success: boolean,
    statusCode: number,
    result: any,
    message: string,
    extendedMessage?: string
): void => {
    const LogsData: LogsDocument = new Logs() as LogsDocument;
    const date = new Date();

    LogsData.activity = activity;
    LogsData.userId = req.body?.loginId || "";
    LogsData.url = req.baseUrl || "";
    LogsData.time = date.getTime();
    LogsData.date = date;
    LogsData.level = level;
    LogsData.description = message;
    LogsData.method = method;
    LogsData.processStatus = statusCode === 200;

    saveLog(LogsData);

    res.status(statusCode).json({
        success,
        result: result || "",
        message: message || "",
        extendedMessage: extendedMessage || "",
        statusCode,
    });
};

// Type definition for contact object
interface Contact {
    name: string;
    email: string;
    mobileNumber: string;
    subject: string;
    message: string;
}

export const sendEmail = async (contact: Contact) => {
    var sender = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    var composemail = {
        from: process.env.EMAIL_USER,
        replyTo: contact.email,
        to: "pixalivetech@gmail.com",
        subject: `PixaliveTech Website Contact: ${contact.subject}`,
        text: `
            Name: ${contact.name}
            Email: ${contact.email}
            Mobile Number: ${contact.mobileNumber}
            Subject: ${contact.subject}
            Message: ${contact.message}
        `,
    };


    sender.sendMail(composemail, function (error:any, info:any) {
        if (error) {
            console.error("Error sending email:", error);
           
        } else {
            console.log("Mail sent successfully:", info.response);
        }
    });
};

// Function to generate random string
export function generate(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export const sendOtp = async (mobileNumber: string, otp: string) => {
    const url = `https://2factor.in/API/V1/2372fa0e-5edd-11eb-8153-0200cd936042/SMS/+91${mobileNumber}/${otp}`;
    await axios.get(url).catch((err:any) => {
        console.error(`Error sending OTP: ${err.message}`);
    });
};

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export let sendEmailOtp = async (email: string, otp: string) => {
    if (!email) throw new Error("Email is not registered");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification OTP",
        text: `Your verification OTP: ${otp}`,
    };

    await transporter.sendMail(mailOptions).catch((err:any) => {
        console.error("Error sending OTP email:", err);
    });
};

export let sendReferralCode = async (email: string, referralCode: string) => {
    if (!email) throw new Error("Email is not registered");

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Join with us",
        text: `Use my referral code: ${referralCode}`,
    };

    return await transporter.sendMail(mailOptions).catch((err:any) => {
        console.error("Error sending referral code email:", err);
    });
};

export let formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export default {
    response,
    sendEmail,
    generate,
    sendOtp,
    sendEmailOtp,
    sendReferralCode,
    formatDate,
};