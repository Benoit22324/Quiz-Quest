import { Link, useNavigate, useParams } from "react-router-dom"
import QuizRepository from "../../data/api/QuizRepository";
import GetQuizUseCase from "../../../domain/usecases/GetQuizUseCase";
import { useEffect, useState } from "react";
import Quiz from "../../../domain/entities/Quiz";
import { StarShow } from "../../../utils/StarShow";
import { CommentDisplay } from "../components/CommentDisplay";
import { useAuth } from "../context/AuthContext";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import CommentRepository from "../../data/api/CommentRepository";
import AddCommentUseCase from "../../../domain/usecases/AddCommentUseCase";
import type { AddCommentFormData } from "../../../typings/AddCommentFormData";

export const QuizPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const quizRepository = new QuizRepository();
    const commentRepository = new CommentRepository();
    const getQuizUseCase = new GetQuizUseCase(quizRepository);
    const addCommentUseCase = new AddCommentUseCase(commentRepository);

    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        setValue
    } = useForm();

    const handleFormSubmit = async (values: FieldValues) => {
        const data = values as AddCommentFormData;

        try {
            if (quizData) {
                const newComment = {
                    quizId: quizData.getId(),
                    content: data.content
                };
                const response = await addCommentUseCase.execute(newComment);

                if (response) {
                    fetchQuiz();
                    setValue("content", "");
                }
            }
        } catch(err: any) {
            throw new Error("Error during the creation of the Comment");
        }
    }

    const fetchQuiz = async () => {
        try {
            if (id !== undefined) {
                const response = await getQuizUseCase.execute({ id });

                if (response) setQuizData(response);
            }
            else navigate("/");
        } catch(err: any) {
            throw new Error("Error during the fetch of the Quiz");
        }
    }

    useEffect(() => {
        if (!isDeleting) fetchQuiz()
    }, [isDeleting])

    return <>
        <div className="quiz_page">
            {
                quizData && <>
                    <section className="quiz_info_section">
                        <h2 className="quiz_title">{quizData.getTitle()}</h2>
                        <p className="quiz_author">by <span className="bold">{quizData.getUser().username}</span></p>
                        <p className="quiz_star_container">{StarShow(quizData.getNotes())}</p>
                        <p className="quiz_difficulty bold">{quizData.getDifficulty()}</p>
                        <Link to={`/part/${quizData.getId()}`} className="quiz_start_btn deco_none">Start</Link>
                    </section>

                    <section className="quiz_comment_section">
                        <h3 className="quiz_comment_title">Comments</h3>

                        {
                            user && <form className="quiz_comment_form" onSubmit={handleSubmit(handleFormSubmit)}>
                                <Controller
                                    control={control}
                                    rules={{ required: true, min: 1 }}
                                    name="content"
                                    defaultValue={""}
                                    render={({field}) => <textarea
                                        className="quiz_comment_input"
                                        placeholder="Enter a comment"
                                        {...field}
                                    />}
                                />
                                <button className="quiz_comment_submit_btn">+</button>
                            </form>
                        }

                        <CommentDisplay commentList={quizData.getComments()} setDelete={setIsDeleting} />
                    </section>
                </>
            }
        </div>
    </>
}