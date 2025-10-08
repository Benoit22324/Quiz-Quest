import type { PartialUser } from "./User";

export type PartialComment = {
    id?: string,
    content?: string,
    user?: PartialUser,
    createdAt?: string
}

class Comment {
    constructor(
        private id: string,
        private content: string,
        private user: PartialUser,
        private createdAt: string
    ) { }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    getUser() {
        return this.user;
    }

    getCreatedAt() {
        return this.createdAt;
    }
}

export default Comment;