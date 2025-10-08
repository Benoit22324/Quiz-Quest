"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreationValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userCreationValidation = zod_1.default.object({
    username: zod_1.default.string().trim()
        .min(3, { error: "The username must contains 3 characters" }),
    email: zod_1.default.string().trim()
        .email({ error: "Invalid Email" }),
    password: zod_1.default.string().trim()
        .min(8, { error: "The password must contains at least 8 characters" })
        .regex(/[0-9]/, { error: "The password must contains at least 1 number" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { error: "The password must contains at least 1 special character" })
});
