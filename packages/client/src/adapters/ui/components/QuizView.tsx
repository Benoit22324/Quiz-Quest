import { Link } from "react-router-dom"
import type Quiz from "../../../domain/entities/Quiz"
import { StarShow } from "../../../utils/StarShow"
import { useAuth } from "../context/AuthContext"
import { FaTrashAlt } from "react-icons/fa"
import DeleteQuizUseCase from "../../../domain/usecases/DeleteQuizUseCase"
import QuizRepository from "../../data/api/QuizRepository"
import { useState } from "react"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"

export type QuizViewProps = {
    quiz: Quiz
    setDelete: (value: boolean) => void
}

export const QuizView = ({ quiz, setDelete }: QuizViewProps) => {
    const { user } = useAuth();

    const quizRepository = new QuizRepository();
    const deleteQuizUseCase = new DeleteQuizUseCase(quizRepository);

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleDeleteQuiz = async() => {
        if (user && (user.getAdmin() || quiz.getUser().id === user.getId())) {
            setDelete(true);

            const response = await deleteQuizUseCase.execute({ id: quiz.getId() });

            if (response) setDelete(false);
        }
    }

    return <>
        {
            deleteModalOpen && <DeleteConfirmationModal handleConfirm={handleDeleteQuiz} onClose={() => setDeleteModalOpen(false)} />
        }
        <div className="relative">
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
            {
                (user?.getAdmin() || quiz.getUser().id === user?.getId()) && <FaTrashAlt onClick={() => setDeleteModalOpen(true)} className="quiz_view_delete_btn" />
            }
        </div>
    </>
}