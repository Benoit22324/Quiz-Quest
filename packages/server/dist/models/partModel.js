"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
exports.partModel = {
    getByQuiz: (id) => {
        try {
            return pool_1.db.query.parts.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.parts.quizId, id),
                columns: {
                    id: true,
                    question: true,
                    quizIndex: true
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of every Quiz Parts: ${err.message}`);
            return [];
        }
    },
    get: (id, index) => {
        try {
            return pool_1.db.query.parts.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.parts.quizIndex, index), (0, drizzle_orm_1.eq)(schemas_1.parts.quizId, id)),
                columns: {
                    id: true,
                    question: true,
                    answers: true,
                    correctAnswer: true
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be fetched");
        }
    },
    create: (part) => {
        try {
            return pool_1.db.insert(schemas_1.parts).values(part);
        }
        catch (err) {
            console.error(`Error during the insert of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be created");
        }
    },
    update: (id, quizId, part) => {
        try {
            return pool_1.db.update(schemas_1.parts).set(part).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.parts.id, id), (0, drizzle_orm_1.eq)(schemas_1.parts.quizId, quizId)));
        }
        catch (err) {
            console.error(`Error during the update of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be updated");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.parts).where((0, drizzle_orm_1.eq)(schemas_1.parts.id, id));
        }
        catch (err) {
            console.error(`Error during the deletion of the Quiz Part: ${err.message}`);
            throw new Error("The Quiz Part couldn't be deleted");
        }
    }
};
