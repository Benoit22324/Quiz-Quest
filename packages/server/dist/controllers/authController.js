"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogout = exports.authRegister = exports.authLogin = void 0;
const argon2_1 = __importDefault(require("argon2"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const validations_1 = require("../validations");
const env_1 = require("../config/env");
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = validations_1.authLoginValidation.parse(req.body);
        const user = yield models_1.userModel.findCredentials(email);
        if (!user)
            return (0, apiResponse_1.apiResponse)(res, null, "Invalids credentials", 400);
        const passVerification = yield argon2_1.default.verify(user.password, password);
        if (!passVerification)
            return (0, apiResponse_1.apiResponse)(res, null, "Invalids credentials", 400);
        const accessToken = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email
        }, env_1.env.JWT_SECRET, {
            expiresIn: "5h"
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain: env_1.env.DOMAIN
        });
        res.cookie("autoReLog", true, {
            sameSite: "none",
            secure: true,
            expires: new Date(new Date().getTime() + (5 * 60 * 60 * 1000)),
            domain: env_1.env.DOMAIN
        });
        return (0, apiResponse_1.apiResponse)(res, user.id, "You're now logged in");
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the login", 500);
    }
});
exports.authLogin = authLogin;
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = validations_1.authRegisterValidation.parse(req.body);
        const exist = yield models_1.userModel.findCredentials(email);
        if (exist)
            return (0, apiResponse_1.apiResponse)(res, null, "Email already used", 400);
        const hashPass = yield argon2_1.default.hash(password);
        if (!hashPass)
            return (0, apiResponse_1.apiResponse)(res, null, "Error during the hash", 500);
        const [newUser] = yield models_1.userModel.create({
            username,
            email,
            password: hashPass
        });
        if (!newUser)
            return (0, apiResponse_1.apiResponse)(res, null, "Error during the creation of the User", 500);
        return (0, apiResponse_1.apiResponse)(res, null, "Registration successfully", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the registration", 500);
    }
});
exports.authRegister = authRegister;
const authLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken", {
            domain: env_1.env.DOMAIN
        });
        res.clearCookie("autoReLog", {
            domain: env_1.env.DOMAIN
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Logout successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the logout", 500);
    }
});
exports.authLogout = authLogout;
