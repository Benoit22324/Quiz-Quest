import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import { userModel } from "../models";
import z from "zod";
import argon2 from "argon2";
import { userCreationValidation, userDeletionValidation } from "../validations";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const usersDatas = await userModel.getAll();

        return apiResponse(res, usersDatas, "Users fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of every Users", 500);
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;

        const userData = await userModel.get(id || user.id);
        if (!userData) return apiResponse(res, null, "User not found", 404);

        return apiResponse(res, userData, "User fetched successfully");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the fetch of the User", 500);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = userCreationValidation.parse(req.body);
        const { user } = res.locals;

        const hashPass = await argon2.hash(password);
        if (!hashPass) return apiResponse(res, null, "Error during the hash", 500);

        await userModel.update(user.id, {
            username,
            email,
            password: hashPass
        });

        return apiResponse(res, null, "User was successfully updated", 201);
    } catch(err: any) {
        if (err instanceof z.ZodError) return apiResponse(res, err.message, "Invalid Form", 400);

        return apiResponse(res, null, "Error during the update of the User", 500);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;

        await userModel.delete(id || user.id);

        return apiResponse(res, null, "User was successfully deleted");
    } catch(err: any) {
        return apiResponse(res, null, "Error during the deletion of the User", 500);
    }
}