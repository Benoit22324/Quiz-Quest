"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
exports.runModel = {
    getByUser: (userId) => {
        try {
            return pool_1.db.query.runs.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.runs.userId, userId),
                columns: {
                    id: true,
                    result: true,
                    createdAt: true
                },
                with: {
                    quiz: {
                        columns: {
                            id: true,
                            title: true,
                            difficulty: true
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
                    }
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of every Runs: ${err.message}`);
            return [];
        }
    },
    create: (run) => {
        try {
            return pool_1.db.insert(schemas_1.runs).values(run);
        }
        catch (err) {
            console.error(`Error during the insert of the Run: ${err.message}`);
            throw new Error("The Run couldn't be created");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.runs).where((0, drizzle_orm_1.eq)(schemas_1.runs.id, id));
        }
        catch (err) {
            console.error(`Error during the deletion of the Run: ${err.message}`);
            throw new Error("The Run couldn't be deleted");
        }
    }
};
