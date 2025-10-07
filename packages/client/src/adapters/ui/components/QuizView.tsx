import { Link } from "react-router-dom"
import type Quiz from "../../../domain/entities/Quiz"
import { StarShow } from "../../../utils/StarShow"

export type QuizViewProps = {
    quiz: Quiz
}

export const QuizView = ({ quiz }: QuizViewProps) => {
    return <>
        <Link to={`/quiz/${quiz.getId()}`} className="deco_none">
            <div className="quiz_view_component">
                <div>
                    <h3>{quiz.getTitle()}</h3>
                    <p className="quiz_view_author">By <span className="bold">{quiz.getUser().username}</span></p>
                </div>
                <p className="quiz_view_star_container">{StarShow(quiz.getNotes())}</p>
                <p className="bold">{quiz.getDifficulty()}</p>
            </div>
        </Link>
    </>
}