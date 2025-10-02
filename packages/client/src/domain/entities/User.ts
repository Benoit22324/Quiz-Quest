export type PartialUser = {
    id?: string
    username?: string
    email?: string
    admin?: string
    createdAt?: string
}

class User {
    constructor(
        private id: string,
        private username: string,
        private email: string,
        private admin: boolean,
        private createdAt: Date
    ) { }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getAdmin() {
        return this.admin;
    }

    getCreatedAt() {
        return this.createdAt;
    }
}

export default User;