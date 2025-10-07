import type { NoteRepositoryInterface } from "../../adapters/data/repositories/NoteRepositoryInterface";
import type { AddNoteInput } from "../../interfaces/inputs/AddNoteInput";

class AddNoteUseCase {
    constructor(private noteRepository: NoteRepositoryInterface) { }

    async execute(input: AddNoteInput): Promise<boolean> {
        const { quizId, note } = input;

        try {
            const response = await this.noteRepository.addNote(quizId, note);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the creation of the note");
        }
    }
}

export default AddNoteUseCase;