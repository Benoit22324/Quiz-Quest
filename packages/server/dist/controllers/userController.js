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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const zod_1 = __importDefault(require("zod"));
const argon2_1 = __importDefault(require("argon2"));
const validations_1 = require("../validations");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersDatas = yield models_1.userModel.getAll();
        return (0, apiResponse_1.apiResponse)(res, usersDatas, "Users fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of every Users", 500);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = res.locals;
        const userData = yield models_1.userModel.get(id || user.id);
        if (!userData)
            return (0, apiResponse_1.apiResponse)(res, null, "User not found", 404);
        return (0, apiResponse_1.apiResponse)(res, userData, "User fetched successfully");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the fetch of the User", 500);
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = validations_1.userCreationValidation.parse(req.body);
        const { user } = res.locals;
        const hashPass = yield argon2_1.default.hash(password);
        if (!hashPass)
            return (0, apiResponse_1.apiResponse)(res, null, "Error during the hash", 500);
        yield models_1.userModel.update(user.id, {
            username,
            email,
            password: hashPass
        });
        return (0, apiResponse_1.apiResponse)(res, null, "User was successfully updated", 201);
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.message, "Invalid Form", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the update of the User", 500);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = res.locals;
        yield models_1.userModel.delete(id || user.id);
        return (0, apiResponse_1.apiResponse)(res, null, "User was successfully deleted");
    }
    catch (err) {
        return (0, apiResponse_1.apiResponse)(res, null, "Error during the deletion of the User", 500);
    }
});
exports.deleteUser = deleteUser;
