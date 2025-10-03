import type Quiz from "../../../domain/entities/Quiz"
import { QuizView } from "./QuizView"

export type QuizDisplayProps = {
    quizList: Quiz[] | null
    customClass?: string
}

export const QuizDisplay = ({ quizList, customClass }: QuizDisplayProps) => {
    return <>
        <div className={`quiz_display_component ${customClass !== undefined ? customClass : ""}`}>
            {
                quizList && quizList.length > 0 ? quizList.map(quiz => <QuizView quiz={quiz} key={quiz.getId()} />)
                : <p className="quiz_display_error">No Quiz Available</p>
            }
        </div>
    </>
}