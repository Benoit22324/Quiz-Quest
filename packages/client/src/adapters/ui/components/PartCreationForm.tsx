import { Controller, useForm, type FieldValues } from "react-hook-form";
import type { PartCreationFormData } from "../../../typings/PartCreationFormData";
import { useEffect, useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import type { PartDataCreation } from "../../../typings/PartDataCreation";
import { Alert } from "./Alert";

export type PartCreationFormProps = {
    partData: PartDataCreation[]
    handleChange: (data: PartDataCreation, type: string) => void
    currentIndex: number
    onSave: () => void
}

export const PartCreationForm = ({ partData, handleChange, currentIndex, onSave }: PartCreationFormProps) => {
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [logError, setLogError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const handleFormSubmit = (values: FieldValues) => {
        const data = values as PartCreationFormData;

        if (data && correctAnswer) {
            const newPart: PartDataCreation = {
                question: data.question,
                answers: `${data.answer1}/${data.answer2}/${data.answer3}/${data.answer4}`,
                correctAnswer: watch(correctAnswer),
                quizIndex: partData.length > 0 ? partData[currentIndex - 2].quizIndex + 1 : currentIndex
            }

            handleChange(newPart, "+");
            reset();
            setCorrectAnswer(null);
        }
    }

    useEffect(() => {
        if (errors.question && (errors.answer1 || errors.answer2 || errors.answer3 || errors.answer4)) setLogError("Question and Answer field empty");
        else if (errors.question) setLogError("Question field empty");
        else if (errors.answer1 || errors.answer2 || errors.answer3 || errors.answer4) setLogError("Answer field empty");
    }, [errors])

    return <>
        {
            logError && <Alert message={logError} type="error" setter={setLogError} />
        }
        <form className="part_creation_form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="part_creation_input_container">
                <label className="part_creation_label bold" htmlFor="question">Question</label>

                <Controller
                    control={control}
                    rules={{ required: true, min: 1 }}
                    name="question"
                    defaultValue={""}
                    render={({field}) => <input
                        id="question"
                        className="part_creation_input"
                        placeholder="Enter a Question"
                        {...field}
                    />}
                />
            </div>

            <div className="part_creation_input_container">
                <label className="part_creation_label bold" htmlFor="answer1">Answer</label>

                <Controller
                    control={control}
                    rules={{ required: true, min: 1 }}
                    name="answer1"
                    defaultValue={""}
                    render={({field}) => <input
                        id="answer1"
                        className="part_creation_input"
                        placeholder="Enter a Answer"
                        {...field}
                    />}
                />

                {
                    correctAnswer === "answer1" ? <MdCheckBox className="part_creation_checkbox" onClick={() => setCorrectAnswer(null)} />
                    : <MdCheckBoxOutlineBlank className="part_creation_checkbox" onClick={() => setCorrectAnswer("answer1")} />
                }
            </div>

            <div className="part_creation_input_container">
                <label className="part_creation_label bold" htmlFor="answer2">Answer</label>

                <Controller
                    control={control}
                    rules={{ required: true, min: 1 }}
                    name="answer2"
                    defaultValue={""}
                    render={({field}) => <input
                        id="answer2"
                        className="part_creation_input"
                        placeholder="Enter a Answer"
                        {...field}
                    />}
                />

                {
                    correctAnswer === "answer2" ? <MdCheckBox className="part_creation_checkbox" onClick={() => setCorrectAnswer(null)} />
                    : <MdCheckBoxOutlineBlank className="part_creation_checkbox" onClick={() => setCorrectAnswer("answer2")} />
                }
            </div>

            <div className="part_creation_input_container">
                <label className="part_creation_label bold" htmlFor="answer3">Answer</label>

                <Controller
                    control={control}
                    rules={{ required: true, min: 1 }}
                    name="answer3"
                    defaultValue={""}
                    render={({field}) => <input
                        id="answer3"
                        className="part_creation_input"
                        placeholder="Enter a Answer"
                        {...field}
                    />}
                />

                {
                    correctAnswer === "answer3" ? <MdCheckBox className="part_creation_checkbox" onClick={() => setCorrectAnswer(null)} />
                    : <MdCheckBoxOutlineBlank className="part_creation_checkbox" onClick={() => setCorrectAnswer("answer3")} />
                }
            </div>

            <div className="part_creation_input_container">
                <label className="part_creation_label bold" htmlFor="answer4">Answer</label>

                <Controller
                    control={control}
                    rules={{ required: true, min: 1 }}
                    name="answer4"
                    defaultValue={""}
                    render={({field}) => <input
                        id="answer4"
                        className="part_creation_input"
                        placeholder="Enter a Answer"
                        {...field}
                    />}
                />

                {
                    correctAnswer === "answer4" ? <MdCheckBox className="part_creation_checkbox" onClick={() => setCorrectAnswer(null)} />
                    : <MdCheckBoxOutlineBlank className="part_creation_checkbox" onClick={() => setCorrectAnswer("answer4")} />
                }
            </div>


            <button className="part_creation_next_btn">{(partData.length === currentIndex - 1) ? "New Question" : "Next"}</button>

            <button type="button" className="part_creation_create_btn" onClick={onSave}>Create</button>
        </form>
    </>
}