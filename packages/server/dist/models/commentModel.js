"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
exports.commentModel = {
    getByQuiz: (quizId) => {
        try {
            return pool_1.db.query.comments.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.comments.quizId, quizId),
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
            });
        }
        catch (err) {
            console.error(`Error during the fetch of every Comments: ${err.message}`);
            return [];
        }
    },
    create: (comment) => {
        try {
            return pool_1.db.insert(schemas_1.comments).values(comment);
        }
        catch (err) {
            console.error(`Error during the insert of the Comment: ${err.message}`);
            throw new Error("The Comment couldn't be created");
        }
    },
    update: (id, authorId, comment) => {
        try {
            return pool_1.db.update(schemas_1.comments).set(comment).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.comments.id, id), (0, drizzle_orm_1.eq)(schemas_1.comments.authorId, authorId)));
        }
        catch (err) {
            console.error(`Error during the update of the Comment: ${err.message}`);
            throw new Error("The Comment couldn't be updated");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.comments).where((0, drizzle_orm_1.eq)(schemas_1.comments.id, id));
        }
        catch (err) {
            console.error(`Error during the deletion of the Comment: ${err.message}`);
            throw new Error("The Comment couldn't be deleted");
        }
    }
};
