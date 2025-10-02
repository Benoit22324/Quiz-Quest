import type Quiz from "../../../domain/entities/Quiz"
import { QuizView } from "./QuizView"

export type QuizDisplayProps = {
    quizList: Quiz[] | null
}

export const QuizDisplay = ({ quizList }: QuizDisplayProps) => {
    return <>
        <div className="quiz_display_component">
            {
                quizList ? quizList.map(quiz => <QuizView quiz={quiz} key={quiz.getId()} />)
                : <p className="quiz_display_error">No Quiz Available</p>
            }
        </div>
    </>
}