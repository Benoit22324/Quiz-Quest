import type { NoteRepositoryInterface } from "../../adapters/data/repositories/NoteRepositoryInterface";
import type { UpdateNoteInput } from "../../interfaces/inputs/UpdateNoteInput";

class UpdateNoteUseCase {
    constructor(private noteRepository: NoteRepositoryInterface) { }

    async execute(input: UpdateNoteInput): Promise<boolean> {
        const { id, quizId, note } = input;

        try {
            const response = await this.noteRepository.updateNote(id, quizId, note);

            if (response.success) return true

            return false
        } catch(err: any) {
            throw new Error("Error during the update of the Note");
        }
    }
}

export default UpdateNoteUseCase;