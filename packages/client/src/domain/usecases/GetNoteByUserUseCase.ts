import type { NoteRepositoryInterface } from "../../adapters/data/repositories/NoteRepositoryInterface";
import type { GetNoteByUserInput } from "../../interfaces/inputs/GetNoteByUserInput";
import Note from "../entities/Note";

class GetNoteByUserUseCase {
    constructor(private noteRepository: NoteRepositoryInterface) { }

    async execute(input: GetNoteByUserInput): Promise<Note | null> {
        const { quizId } = input;

        try {
            const response = await this.noteRepository.getNoteByUser(quizId);

            if (response.success && response.data) {
                const responseData = response.data;
                const convertedNote = new Note(responseData.id, responseData.note);

                return convertedNote
            }

            return null
        } catch(err: any) {
            return null
        }
    }
}

export default GetNoteByUserUseCase;