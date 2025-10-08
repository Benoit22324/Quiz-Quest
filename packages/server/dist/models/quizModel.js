"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
exports.quizModel = {
    getAll: () => {
        try {
            return pool_1.db.query.quizs.findMany({
                columns: {
                    id: true,
                    title: true,
                    difficulty: true,
                    createdAt: true
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    notes: {
                        columns: {
                            id: true,
                            note: true
                        }
                    }
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of every Quizs: ${err.message}`);
            return [];
        }
    },
    get: (id) => {
        try {
            return pool_1.db.query.quizs.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.quizs.id, id),
                columns: {
                    id: true,
                    title: true,
                    difficulty: true,
                    createdAt: true
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    comments: {
                        columns: {
                            id: true,
                            content: true,
                            createdAt: true
                        },
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    },
                    notes: {
                        columns: {
                            id: true,
                            note: true
                        }
                    }
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be fetched");
        }
    },
    create: (quiz) => {
        try {
            return pool_1.db.insert(schemas_1.quizs).values(quiz).returning({
                id: schemas_1.quizs.id
            });
        }
        catch (err) {
            console.error(`Error during the insert of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be created");
        }
    },
    update: (id, authorId, quiz) => {
        try {
            return pool_1.db.update(schemas_1.quizs).set(quiz).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.quizs.id, id), (0, drizzle_orm_1.eq)(schemas_1.quizs.authorId, authorId)));
        }
        catch (err) {
            console.error(`Error during the update of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be updated");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.quizs).where((0, drizzle_orm_1.eq)(schemas_1.quizs.id, id));
        }
        catch (err) {
            console.error(`Error during the deletion of the Quiz: ${err.message}`);
            throw new Error("The Quiz couldn't be deleted");
        }
    }
};
