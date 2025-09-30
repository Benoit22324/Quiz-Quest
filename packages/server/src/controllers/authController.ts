import { Request, Response } from "express";
import argon2 from "argon2";
import z from "zod";
import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse";
import { userModel } from "../models";
import { authLoginValidation } from "../validations";
import { env } from "../config/env";

export const authLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = authLoginValidation.parse(req.body);

        const user = await userModel.findCredentials(email);
        if (!user) return apiResponse(res, null, "Invalids credentials", 400);

        const passVerification = await argon2.verify(user.password, password);
        if (!passVerification) return apiResponse(res, null, "Invalids credentials", 400);

        const accessToken = jwt.sign({
            id: user.id
        },
        env.JWT_SECRET, {
            expiresIn: "2h"
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true
        })
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the login", 500);
    }
}

export const authRegister = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const exist = await userModel.findCredentials(email);
        if (exist) return apiResponse(res, null, "Email already used", 400);

        const hashPass = await argon2.hash(password);
        if (!hashPass) return apiResponse(res, null, "Error during the hash", 500);

        const [newUser] = await userModel.create({
            username,
            email,
            password: hashPass
        });
        if (!newUser) return apiResponse(res, null, "Error during the creation of the User", 500);

        return apiResponse(res, null, "Registration successfully", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the registration", 500);
    }
}

export const authLogout = async (req: Response, res: Response) => {
    try {
        res.clearCookie("accessToken");

        return apiResponse(res, null, "Logout successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the logout", 500);
    }
}