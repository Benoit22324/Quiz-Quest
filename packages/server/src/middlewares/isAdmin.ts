import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { userModel } from "../models";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals;

    try {
        const credential = await userModel.findCredentials(user.email);
        if (!credential || !credential.admin) return apiResponse(res, null, "User not authorized", 401);

        return next();
    } catch(err: any) {
        return apiResponse(res, null, "User not authorized", 401);
    }
}