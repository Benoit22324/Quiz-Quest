"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
exports.noteModel = {
    getByQuiz: (id) => {
        try {
            return pool_1.db.query.notes.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.notes.quizId, id),
                columns: {
                    id: true,
                    note: true
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of every Notes: ${err.message}`);
            return [];
        }
    },
    getByUserAndQuiz: (quizId, userId) => {
        try {
            return pool_1.db.query.notes.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.notes.quizId, quizId), (0, drizzle_orm_1.eq)(schemas_1.notes.userId, userId)),
                columns: {
                    id: true,
                    note: true
                }
            });
        }
        catch (err) {
            console.error(`Error during the fetch of the Note: ${err.message}`);
            throw new Error("The Note couldn't be fetched");
        }
    },
    create: (note) => {
        try {
            return pool_1.db.insert(schemas_1.notes).values(note);
        }
        catch (err) {
            console.error(`Error during the insert of the Note: ${err.message}`);
            throw new Error("The Note couldn't be created");
        }
    },
    update: (id, userId, note) => {
        try {
            return pool_1.db.update(schemas_1.notes).set(note).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.notes.id, id), (0, drizzle_orm_1.eq)(schemas_1.notes.userId, userId)));
        }
        catch (err) {
            console.error(`Error during the update of the Note: ${err.message}`);
            throw new Error("The Note couldn't be updated");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.notes).where((0, drizzle_orm_1.eq)(schemas_1.notes.id, id));
        }
        catch (err) {
            console.error(`Error during the deletion of the Note: ${err.message}`);
            throw new Error("The Note couldn't be deleted");
        }
    }
};
