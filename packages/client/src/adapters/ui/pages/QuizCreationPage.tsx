import { useState } from "react"
import { QuizCreationForm } from "../components/QuizCreationForm";
import type { QuizCreationFormData } from "../../../typings/QuizCreationFormData";
import { PartCreationForm } from "../components/PartCreationForm";
import QuizRepository from "../../data/api/QuizRepository";
import AddQuizUseCase from "../../../domain/usecases/AddQuizUseCase";
import PartRepository from "../../data/api/PartRepository";
import AddPartUseCase from "../../../domain/usecases/AddPartUseCase";
import type { PartDataCreation } from "../../../typings/PartDataCreation";
import { useNavigate } from "react-router-dom";

export const QuizCreationPage = () => {
    const quizRepository = new QuizRepository();
    const partRepository = new PartRepository();
    const addQuizUseCase = new AddQuizUseCase(quizRepository);
    const addPartUseCase = new AddPartUseCase(partRepository);

    const [onPart, setOnPart] = useState<boolean>(false);
    const [quizData, setQuizData] = useState<QuizCreationFormData | null>(null);
    const [partData, setPartData] = useState<PartDataCreation[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(1);

    const navigate = useNavigate();

    const handleQuizConfirm = (data: QuizCreationFormData) => {
        setQuizData(data);
        setOnPart(true);
    }

    const storePart = (newPart: PartDataCreation) => {
        if (partData.length > 0) {
            const alreadyAdded = partData.find(part => part.quizIndex === newPart.quizIndex);

            if (alreadyAdded) {
                const newPartList = partData.map(part => part === alreadyAdded ? newPart : part);

                setPartData(newPartList);
            }
            else setPartData([...partData, newPart]);
        } else setPartData([newPart])
    }

    const changePartIndex = (data: PartDataCreation, type: string) => {
        if (type === "+") {
            storePart(data);
            setCurrentIndex(currentIndex + 1);
        }
        else if (type === "-") {
            storePart(data);
            setCurrentIndex(currentIndex - 1);
        }
    }

    const handleSaveQuiz = async () => {
        if (quizData && partData.length > 0) {
            const quizId = await addQuizUseCase.execute(quizData);

            if (quizId) {
                const partPromises = partData.map(async(part) => await addPartUseCase.execute({
                    quizId,
                    question: part.question,
                    answers: part.answers,
                    correctAnswer: part.correctAnswer,
                    index: part.quizIndex
                }))

                await Promise.all(partPromises);

                navigate("/")
            }
        }
    }

    return <>
        <div className="quiz_creation_page">
            <h2 className="quiz_creation_title">Quiz Creation</h2>

            {
                onPart ? <PartCreationForm partData={partData} handleChange={changePartIndex} currentIndex={currentIndex} onSave={handleSaveQuiz} />
                : <QuizCreationForm handleConfirm={handleQuizConfirm} />
            }
        </div>
    </>
}