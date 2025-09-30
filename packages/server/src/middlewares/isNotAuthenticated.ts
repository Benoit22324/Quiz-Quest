import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { apiResponse } from "../utils/apiResponse";

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) return next();

    try {
        jwt.verify(accessToken, env.JWT_SECRET);

        return apiResponse(res, null, "You're already authenticated", 401);
    } catch(err: any) {
        next();
    }
}