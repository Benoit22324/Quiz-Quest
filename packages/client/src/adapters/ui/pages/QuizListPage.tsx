import { FaSearch } from "react-icons/fa"
import { QuizDisplay } from "../components/QuizDisplay"
import QuizRepository from "../../data/api/QuizRepository"
import GetAllQuizsUseCase from "../../../domain/usecases/GetAllQuizsUseCase";
import React, { useEffect, useState } from "react";
import Quiz from "../../../domain/entities/Quiz";

export const QuizListPage = () => {
    const quizRepository = new QuizRepository();
    const getAllQuizsUseCase = new GetAllQuizsUseCase(quizRepository);

    const [quizList, setQuizList] = useState<Quiz[] | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchedQuizList, setSearchedQuizList] = useState<Quiz[] | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const fetchQuizs = async () => {
        try {
            const response = await getAllQuizsUseCase.execute();

            if (response) setQuizList(response)
        } catch(err) {
            throw new Error("Error during the fetch of Quizs");
        }
    }

    const handleSearchBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (searchedQuizList) setSearchedQuizList(null);

        setSearchValue(e.target.value);
    }

    const handleSearchQuizList = () => {
        if (quizList && searchValue.trim() !== "") {
            const filteredList = quizList.filter(quiz => quiz.getTitle().includes(searchValue));

            setSearchedQuizList(filteredList);
        }
    }

    useEffect(() => {
        if (!isDeleting) fetchQuizs()
    }, [isDeleting])

    return <>
        <div className="quiz_list_page">
            <h2 className="quiz_list_title">Quiz List</h2>

            <section className="search_bar_section">
                <input id="search_bar" className="search_bar" type="text" placeholder="Quiz Title" value={searchValue} onChange={handleSearchBarChange} />
                <FaSearch className="search_button" onClick={handleSearchQuizList} />
            </section>

            <section className="quiz_list_section">
                <QuizDisplay quizList={searchedQuizList || quizList} setDelete={setIsDeleting} customClass="quiz_display_height" />
            </section>
        </div>
    </>
}