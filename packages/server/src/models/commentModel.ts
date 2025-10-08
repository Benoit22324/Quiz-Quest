import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { comments } from "../schemas";
import { NewComment } from "../entities";

export const commentModel = {
    getByQuiz: (quizId: string) => {
        try {
            return db.query.comments.findMany({
                where: eq(comments.quizId, quizId),
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
            })
        } catch(err: any) {
            console.error(`Error during the fetch of every Comments: ${err.message}`);
            return []
        }
    },

    create: (comment: NewComment) => {
        try {
            return db.insert(comments).values(comment)
        } catch(err: any) {
            console.error(`Error during the insert of the Comment: ${err.message}`);
            throw new Error("The Comment couldn't be created");
        }
    },

    update: (id: string, authorId: string, comment: NewComment) => {
        try {
            return db.update(comments).set(comment).where(
                and(
                    eq(comments.id, id),
                    eq(comments.authorId, authorId)
                )
            )
        } catch(err: any) {
            console.error(`Error during the update of the Comment: ${err.message}`);
            throw new Error("The Comment couldn't be updated");
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(comments).where(
                eq(comments.id, id)
            )
        } catch(err: any) {
            console.error(`Error during the deletion of the Comment: ${err.message}`);
            throw new Error("The Comment couldn't be deleted");
        }
    }
}