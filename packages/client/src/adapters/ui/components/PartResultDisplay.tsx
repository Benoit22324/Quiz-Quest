import { useEffect, useState } from "react"
import type { AllParts } from "../../../domain/entities/Part"
import type { PartRunSave } from "../../../typings/PartRunSave"
import { Link } from "react-router-dom"
import NoteRepository from "../../data/api/NoteRepository"
import GetNoteByUserUseCase from "../../../domain/usecases/GetNoteByUserUseCase"
import { useAuth } from "../context/AuthContext"
import Note from "../../../domain/entities/Note"
import { SingleStarIcon } from "./SingleStarIcon"
import AddNoteUseCase from "../../../domain/usecases/AddNoteUseCase"
import UpdateNoteUseCase from "../../../domain/usecases/UpdateNoteUseCase"
import RunRepository from "../../data/api/RunRepository"
import AddRunUseCase from "../../../domain/usecases/AddRunUseCase"

export type PartResultDisplayProps = {
    quizId: string
    quizParts: AllParts[]
    runSave: PartRunSave[]
    currentIndex: number
    setCurrentIndex: (value: number) => void
    totalLength: number
}

export const PartResultDisplay = ({ quizId, quizParts, runSave, currentIndex, setCurrentIndex, totalLength }: PartResultDisplayProps) => {
    const { user } = useAuth();

    const noteRepository = new NoteRepository();
    const runRepository = new RunRepository();
    const getNoteByUserUseCase = new GetNoteByUserUseCase(noteRepository);
    const addNoteUseCase = new AddNoteUseCase(noteRepository);
    const updateNoteUseCase = new UpdateNoteUseCase(noteRepository);
    const addRunUseCase = new AddRunUseCase(runRepository);

    const score = runSave.filter(run => run.correct === true).length;
    const [selectedPart, setSelectedPart] = useState<AllParts | null>(null);
    const [selectedRunSave, setSelectedRunSave] = useState<PartRunSave | null>(null);
    const [userNote, setUserNote] = useState<Note | null>(null);
    const [currentNote, setCurrentNote] = useState<number>(0);

    const handleIndexChange = (type: string) => {
        if (type === "+") setCurrentIndex(currentIndex + 1);
        else if (type === "-") setCurrentIndex(currentIndex - 1);
    }

    const saveRun = async () => {
        try {
            const newRun = {
                quizId,
                score
            };
            await addRunUseCase.execute(newRun);
        } catch(err: any) {
            throw new Error("Error during the creation of the Run");
        }
    }

    const fetchNote = async () => {
        try {
            const response = await getNoteByUserUseCase.execute({ quizId });

            if (response) {
                setUserNote(response);
                setCurrentNote(response.getNote());
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the Note");
        }
    }

    const addNote = async () => {
        try {
            const newNote = {
                quizId,
                note: currentNote
            };
            const response = await addNoteUseCase.execute(newNote);

            if (response) await fetchNote();
        } catch(err: any) {
            throw new Error("Error during the creation of the note");
        }
    }

    const updateNote = async () => {
        try {
            if (userNote) {
                const newNote = {
                    id: userNote.getId(),
                    quizId,
                    note: currentNote
                }
                const response = await updateNoteUseCase.execute(newNote);

                if (response) fetchNote();
            }
        } catch(err: any) {
            throw new Error("Error during the update of the Note");
        }
    }

    useEffect(() => {
        if (user && currentNote > 0) {
            if (!userNote) addNote();
            else if (userNote) updateNote();
        }
    }, [ currentNote ])

    useEffect(() => {
        const currentPart = quizParts[currentIndex - 1];
        const currentRun = runSave.find(run => run.partId === currentPart.id);

        if (currentPart && currentRun) {
            setSelectedPart(currentPart);
            setSelectedRunSave(currentRun);
        }
    }, [currentIndex])

    useEffect(() => {
        if (user) {
            fetchNote();
            saveRun();
        }
    }, [])

    return <>
        {
            (user) && <div className="part_result_note_container">
                <p className="part_result_note">Your note :</p>
                <span className="part_result_star_container">
                    <span onClick={() => setCurrentNote(1)}>
                        <SingleStarIcon note={currentNote} limit={1} />
                    </span>
                    <span onClick={() => setCurrentNote(2)}>
                        <SingleStarIcon note={currentNote} limit={2} />
                    </span>
                    <span onClick={() => setCurrentNote(3)}>
                        <SingleStarIcon note={currentNote} limit={3} />
                    </span>
                    <span onClick={() => setCurrentNote(4)}>
                        <SingleStarIcon note={currentNote} limit={4} />
                    </span>
                    <span onClick={() => setCurrentNote(5)}>
                        <SingleStarIcon note={currentNote} limit={5} />
                    </span>
                </span>
            </div>
        }
        <p className="part_result_score">Score: {score}/{totalLength}</p>
        {
            (selectedPart && selectedRunSave) && <div className="part_result_answer_display">
                <h3 className="quiz_result_answer_title">{selectedPart.question}</h3>
                <p>Your answer: <span className={`bold ${selectedRunSave.correct ? "part_result_correct_answer" : "part_result_wrong_answer"}`}>{selectedRunSave.answer}</span></p>
                <p>Correct answer: <span className="bold part_result_correct_answer">{selectedPart.correctAnswer}</span></p>
            </div>
        }
        <div className="part_result_btn_container">
            <button className="part_result_prev_btn" onClick={() => handleIndexChange("-")} disabled={currentIndex === 1}>Prev</button>
            <button className="part_result_next_btn" onClick={() => handleIndexChange("+")} disabled={currentIndex === totalLength}>Next</button>
        </div>
        <Link to={"/"} className="part_result_leave_btn deco_none">Leave</Link>
    </>
}