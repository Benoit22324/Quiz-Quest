import { Link } from "react-router-dom"
import GetAllQuizsUseCase from "../../../domain/usecases/GetAllQuizsUseCase"
import QuizRepository from "../../data/api/QuizRepository";
import { useEffect, useState } from "react";
import type Quiz from "../../../domain/entities/Quiz";
import { QuizDisplay } from "../components/QuizDisplay";

export const HomePage = () => {
    const quizRepository = new QuizRepository();
    const getAllQuizsUseCase = new GetAllQuizsUseCase(quizRepository);

    const [quizs, setQuizs] = useState<Quiz[] | null>(null);

    const fetchQuizs = async () => {
        try {
            const response = await getAllQuizsUseCase.execute();

            if (response) setQuizs(response)
        } catch(err) {
            throw new Error("Error during the fetch of Quizs");
        }
    }

    const randomQuiz = (quizList: Quiz[] | null) => {
        if (quizList && quizList.length > 20) {
            let currentList = [...quizList];
            const limitedList: Quiz[] = [];

            for(let i = 1; i <= 20; i++) {
                const rdm = Math.floor(Math.random() * currentList.length);
                const selectedQuiz = currentList[rdm];
                const alreadyAdded = limitedList.find(quiz => quiz.getId() === selectedQuiz.getId());

                if (!alreadyAdded) {
                    limitedList.push(currentList[rdm]);
                    currentList = currentList.filter(quiz => quiz.getId() !== selectedQuiz.getId());
                }
            }

            return limitedList
        }

        return quizList
    }

    useEffect(() => {
        fetchQuizs()
    }, [])

    return <>
        <div className="home_page">
            <section className="introduction_section">
                <span>Wanna create a Quiz ?</span>

                <div>
                    <Link to="/register" className="introduction_section_register_btn">Register</Link>
                    <span> to do it !</span>
                </div>
            </section>

            <section className="daily_section">
                <h2 className="daily_title">Daily Quiz</h2>

                <QuizDisplay quizList={randomQuiz(quizs)} />
            </section>
        </div>
    </>
}