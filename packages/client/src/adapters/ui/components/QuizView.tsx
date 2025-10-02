import { Link } from "react-router-dom"
import type Quiz from "../../../domain/entities/Quiz"
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6"

export type QuizViewProps = {
    quiz: Quiz
}

export const QuizView = ({ quiz }: QuizViewProps) => {
    const showStar = () => {
        const totalNotes = quiz.getNotes().reduce((a, c) => c.note ? a += c.note : a, 0);
        const note = totalNotes > 0 ? totalNotes / quiz.getNotes().length : 0;

        const starNode = [];

        for(let i = 1; i <= 5; i++) {
            if (note >= i) starNode.push(<FaStar className="quiz_view_star" key={i} />);
            else if (note < i && note >= i - 0.5) starNode.push(<FaRegStarHalfStroke className="quiz_view_star" key={i} />);
            else starNode.push(<FaRegStar className="quiz_view_star" key={i} />);
        }

        return starNode
    }

    return <>
        <Link to={`/quiz/${quiz.getId()}`} className="deco_none">
            <div className="quiz_view_component">
                <h3>{quiz.getTitle()}</h3>
                <p className="quiz_view_star_container">{showStar()}</p>
                <p className="bold">{quiz.getDifficulty()}</p>
                <p>By <span className="bold">{quiz.getUser().username}</span></p>
            </div>
        </Link>
    </>
}