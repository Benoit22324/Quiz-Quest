import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PartRepository from "../../data/api/PartRepository";
import GetAllPartsUseCase from "../../../domain/usecases/GetAllPartsUseCase";
import QuizRepository from "../../data/api/QuizRepository";
import GetQuizUseCase from "../../../domain/usecases/GetQuizUseCase";
import Quiz from "../../../domain/entities/Quiz";
import { type AllParts } from "../../../domain/entities/Part";
import { QADisplay } from "../components/QADisplay";
import type { PartRunSave } from "../../../typings/PartRunSave";
import { PartResultDisplay } from "../components/PartResultDisplay";

export const PartPage = () => {
    const { quizId } = useParams();

    const quizRepository = new QuizRepository();
    const partRepository = new PartRepository();
    const getQuizUseCase = new GetQuizUseCase(quizRepository);
    const getAllPartsRepository = new GetAllPartsUseCase(partRepository);

    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const [quizParts, setQuizParts] = useState<AllParts[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [runSave, setRunSave] = useState<PartRunSave[]>([]);
    const [finished, setFinished] = useState<boolean>(false);

    const fetchQuizPart = async () => {
        try {
            if (quizId) {
                const response1 = await getQuizUseCase.execute({ id: quizId });
                const response2 = await getAllPartsRepository.execute({ quizId });

                if (response1 && response2) {
                    setQuizData(response1);
                    setQuizParts(response2);
                }
            }
        } catch(err: any) {
            throw new Error("Error during the fetch of datas");
        }
    }

    const handleSaveRun = (newSave: PartRunSave) => {
        if (quizParts) {
            const currentPart = quizParts[currentIndex - 1];
            const alreadySaved = runSave.find(run => run.partId === currentPart.id);

            if (alreadySaved) {
                const oldRunSave = [...runSave];
                const newRunSave = oldRunSave.map(run => run.partId === currentPart.id ? newSave : run);

                setRunSave(newRunSave);
            } else {
                setRunSave([...runSave, newSave]);
            }
        }
    }

    const handleIndexChange = (type: string, answer: string, correct: boolean) => {
        if (quizParts) {
            if (type === "+" && answer.trim() !== "") {
                const save = {
                    partId: quizParts[currentIndex - 1].id,
                    answer,
                    correct
                }

                handleSaveRun(save);
                setCurrentIndex(!(currentIndex + 1 > quizParts.length) ? currentIndex + 1 : 1);
            } else if (type === "-") {
                const save = {
                    partId: quizParts[currentIndex - 1].id,
                    answer,
                    correct
                }

                if (answer.trim() !== "") handleSaveRun(save);
                setCurrentIndex(currentIndex - 1);
            }
        }
    }

    useEffect(() => {
        fetchQuizPart()
    }, [])

    useEffect(() => {
        if (finished) setCurrentIndex(1);
    }, [finished])

    return <>
        <div className="part_page">
            {
                (quizData && quizParts && currentIndex) && <>
                    <section className="part_quiz_info_section">
                        <h2 className="part_quiz_title">{quizData.getTitle()}</h2>
                        <p className="part_quiz_author">by <span className="bold">{quizData.getUser().username}</span></p>
                        {
                            !finished && <span className="part_quiz_indexer bold">{currentIndex}/{quizParts.length}</span>
                        }
                    </section>

                    <section className="part_question_answser_section">
                        {
                            !finished ? <QADisplay
                                quizId={quizData.getId()}
                                quizIndex={quizParts[currentIndex - 1].quizIndex}
                                runSave={runSave}
                                handleChange={handleIndexChange}
                                setFinished={setFinished}
                                currentIndex={currentIndex}
                                totalLength={quizParts.length}
                            />
                            : <PartResultDisplay
                                quizId={quizData.getId()}
                                quizParts={quizParts}
                                runSave={runSave}
                                currentIndex={currentIndex}
                                setCurrentIndex={setCurrentIndex}
                                totalLength={quizParts.length}
                            />
                        }
                    </section>
                </>
            }
        </div>
    </>
}