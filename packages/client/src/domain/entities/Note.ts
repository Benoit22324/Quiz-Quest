export type PartialNote = {
    id?: string
    note?: number
}

class Note {
    constructor(
        private id: string,
        private note: number
    ) { }

    getId() {
        return this.id;
    }

    getNote() {
        return this.note;
    }
}

export default Note;