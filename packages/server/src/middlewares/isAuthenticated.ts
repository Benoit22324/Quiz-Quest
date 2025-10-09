import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse";
import { env } from "../config/env";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.replace("Bearer ", "");

    if (!accessToken) return apiResponse(res, null, "You're not authenticated", 401);

    try {
        const verification = jwt.verify(accessToken, env.JWT_SECRET);
        res.locals.user = verification;
        return next();
    } catch(err: any) {
        return apiResponse(res, null, "Invalid Token", 401);
    }
}