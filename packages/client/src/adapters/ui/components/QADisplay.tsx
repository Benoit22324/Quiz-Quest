import { useEffect, useState } from "react"
import PartRepository from "../../data/api/PartRepository"
import GetPartUseCase from "../../../domain/usecases/GetPartUseCase"
import Part from "../../../domain/entities/Part"
import { AnswerView } from "./AnswerView"
import type { PartRunSave } from "../../../typings/PartRunSave"

export type QADisplayProps = {
    quizId: string
    quizIndex: number
    runSave: PartRunSave[]
    handleChange: (type: string, answer: string, correct: boolean) => void
    setFinished: (value: boolean) => void
    currentIndex: number
    totalLength: number
}

export const QADisplay = ({ quizId, quizIndex, runSave, handleChange, setFinished, currentIndex, totalLength }: QADisplayProps) => {
    const partRepository = new PartRepository();
    const getPartUseCase = new GetPartUseCase(partRepository);

    const [quizPart, setQuizPart] = useState<Part | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");

    const fetchQuizPart = async () => {
        try {
            const response = await getPartUseCase.execute({ quizId, index: quizIndex });

            if (response) {
                setQuizPart(response);

                if (runSave) {
                    const currentRunSave = runSave.filter(run => run.partId === response.getId());

                    if (currentRunSave[0]) setSelectedAnswer(currentRunSave[0].answer);
                }
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of the Part");
        }
    }

    const handleIndexChange = (type: string) => {
        if (quizPart) {
            handleChange(type, selectedAnswer, selectedAnswer === quizPart.getCorrectAnswer());
            setSelectedAnswer("");
        }
    }

    useEffect(() => {
        fetchQuizPart()
    }, [ quizIndex ])

    return <>
        {
            quizPart && <>
                <h3 className="qa_display_question">{quizPart.getQuestion()}</h3>
                {
                    quizPart.getAnswers() && quizPart.getAnswers().split("/").map(answer => <AnswerView answer={answer} selected={selectedAnswer} onSelect={setSelectedAnswer} key={answer} />)
                }
                <div className="qa_display_btn_container">
                    <button className="qa_display_prev_btn" onClick={() => handleIndexChange("-")} disabled={currentIndex === 1}>Prev</button>
                    {
                        currentIndex === totalLength ? <button className="qa_display_next_btn" onClick={() => {handleIndexChange("+"); setFinished(true);}} disabled={selectedAnswer.trim() === ""}>Finish</button>
                        : <button className="qa_display_next_btn" onClick={() => handleIndexChange("+")} disabled={selectedAnswer.trim() === ""}>Next</button>
                    }
                </div>
            </>
        }
    </>
}