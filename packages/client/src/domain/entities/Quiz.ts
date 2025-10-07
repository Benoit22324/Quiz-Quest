import type { PartialComment } from "./Comment";
import type { PartialNote } from "./Note";
import type { PartialPart } from "./Part";
import type { PartialUser } from "./User";

export type PartialQuiz = {
    id?: string,
    title?: string,
    difficulty?: string,
    user?: PartialUser,
    createdAt?: string,
    notes?: PartialNote[],
    comments?: PartialComment[],
    parts?: PartialPart[]
}

class Quiz {
    constructor(
        private id: string,
        private title: string,
        private difficulty: string,
        private user: PartialUser,
        private createdAt: string,
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

    getComments() {
        return this.comments;
    }
}

export default Quiz;