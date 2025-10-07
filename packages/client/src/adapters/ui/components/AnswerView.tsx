export type AnswerViewProps = {
    answer: string
    selected: string
    onSelect: (value: string) => void
}

export const AnswerView = ({ answer, selected, onSelect }: AnswerViewProps) => {
    return <>
        <div className={`answer_view_component${selected === answer ? " answer_view_selected" : ""}`} onClick={() => onSelect(answer)}>
            <span>{answer}</span>
        </div>
    </>
}