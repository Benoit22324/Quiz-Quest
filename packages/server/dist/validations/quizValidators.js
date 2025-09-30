"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCreationValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.quizCreationValidation = zod_1.default.object({
    title: zod_1.default.string().trim()
        .min(1, { error: "The title must contains at least 1 character" })
        .max(100, { error: "The title shouldn't have more than 100 characters" }),
    difficulty: zod_1.default.string().trim()
        .min(1, { error: "The difficulty must contains at least 1 character" })
        .max(60, { error: "The difficulty shouldn't have more than 60 characters" })
});
