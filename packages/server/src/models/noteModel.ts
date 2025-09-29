import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { notes } from "../schemas";
import { NewNote } from "../entities";

export const noteModel = {
    getByQuiz: (id: string) => {
        try {
            return db.query.notes.findMany({
                where: eq(notes.quizId, id),
                columns: {
                    id: true,
                    note: true
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of every Notes: ${err.message}`);
            return []
        }
    },

    getByUserAndQuiz: (quizId: string, userId: string) => {
        try {
            return db.query.notes.findFirst({
                where: and(
                    eq(notes.quizId, quizId),
                    eq(notes.userId, userId)
                ),
                columns: {
                    id: true,
                    note: true
                }
            })
        } catch(err: any) {
            console.error(`Error during the fetch of the Note: ${err.message}`);
            throw new Error("The Note couldn't be fetched");
        }
    },

    create: (note: NewNote) => {
        try {
            return db.insert(notes).values(note)
        } catch(err: any) {
            console.error(`Error during the insert of the Note: ${err.message}`);
            throw new Error("The Note couldn't be created");
        }
    },

    update: (id: string, userId: string, note: NewNote) => {
        try {
            return db.update(notes).set(note).where(
                and(
                    eq(notes.id, id),
                    eq(notes.userId, userId)
                )
            )
        } catch(err: any) {
            console.error(`Error during the update of the Note: ${err.message}`);
            throw new Error("The Note couldn't be updated");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(notes).where(
                eq(notes.id, id)
            )
        } catch(err: any) {
            console.error(`Error during the deletion of the Note: ${err.message}`);
            throw new Error("The Note couldn't be deleted");
        }
    }
}