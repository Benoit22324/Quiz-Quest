import type Run from "../../../domain/entities/Run"
import { DateShow } from "../../../utils/DateShow"
import { StarShow } from "../../../utils/StarShow"

export type RunViewProps = {
    run: Run
}

export const RunView = ({ run }: RunViewProps) => {
    const runQuiz = run.getQuiz();

    return <>
        <div className="run_view_component">
            <p className="run_view_date">{DateShow(run.getCreatedAt())}</p>
            <div>
                <h3>{runQuiz.title}</h3>
                <p className="run_view_author">By <span className="bold">{runQuiz.user && runQuiz.user.username}</span></p>
            </div>
            <p className="run_view_star_container">{runQuiz.notes && StarShow(runQuiz.notes)}</p>
            <p className="bold">{runQuiz.difficulty}</p>
            <p className="run_view_score">Your score : <span className="bold">{run.getResult()}/{runQuiz.parts && runQuiz.parts.length}</span></p>
        </div>
    </>
}