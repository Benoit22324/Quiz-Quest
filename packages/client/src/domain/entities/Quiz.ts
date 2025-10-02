import type { PartialComment } from "./Comment";
import type { PartialNote } from "./Note";
import type { PartialUser } from "./User";

export type PartialQuiz = {
    id?: string,
    title?: string,
    difficulty?: string,
    user?: PartialUser,
    createdAt?: Date,
    notes?: PartialNote,
    comments?: PartialComment
}

class Quiz {
    constructor(
        private id: string,
        private title: string,
        private difficulty: string,
        private user: PartialUser,
        private createdAt: Date,
        private notes: PartialNote[],
        private comments: PartialComment[] | null
    ) { }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getDifficulty() {
        return this.difficulty;
    }

    getUser() {
        return this.user;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getNotes() {
        return this.notes;
    }

    getComment() {
        return this.comments;
    }
}

export default Quiz;