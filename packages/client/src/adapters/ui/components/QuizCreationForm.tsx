import { Controller, useForm, type FieldValues } from "react-hook-form"
import type { QuizCreationFormData } from "../../../typings/QuizCreationFormData";

export type QuizCreationFormProps = {
    handleConfirm: (data: QuizCreationFormData) => void
}

export const QuizCreationForm = ({ handleConfirm }: QuizCreationFormProps) => {
    const {
        control,
        handleSubmit
    } = useForm();

    const handleFormSubmit = (values: FieldValues) => {
        const data = values as QuizCreationFormData;

        handleConfirm(data);
    }

    return <>
        <form className="quiz_creation_form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="quiz_creation_input_container">
                <label className="quiz_creation_label bold" htmlFor="title">Title</label>

                <Controller
                    control={control}
                    rules={{ required: true, min: 1 }}
                    name="title"
                    defaultValue={""}
                    render={({field}) => <input
                        id="title"
                        className="quiz_creation_input"
                        placeholder="Enter a Title"
                        {...field}
                    />}
                />
            </div>

            <div className="quiz_creation_input_container">
                <label className="quiz_creation_label bold" htmlFor="difficulty">Difficulty</label>

                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="difficulty"
                    defaultValue={""}
                    render={({field}) => <select
                        id="difficulty"
                        className="quiz_creation_input"
                        {...field}
                    >
                        <option value={""} hidden>Select a difficulty</option>
                        <option value={"Easy"}>Easy</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Hard"}>Hard</option>
                        <option value={"Insane"}>Insane</option>
                    </select>}
                />
            </div>

            <button className="quiz_creation_next_btn">Next</button>
        </form>
    </>
}