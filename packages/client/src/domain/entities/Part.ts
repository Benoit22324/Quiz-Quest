export type AllParts = {
    id: string,
    question: string,
    correctAnswer: string,
    quizIndex: number
}

export type PartialPart = {
    id?: string
    question?: string
    answers?: string
    correctAnswer?: string
    quizIndex?: number
}

class Part {
    constructor(
        private id: string,
        private question: string,
        private answers: string,
        private correctAnswer: string,
        private quizIndex: number
    ) { }

    getId() {
        return this.id;
    }

    getQuestion() {
        return this.question;
    }

    getAnswers() {
        return this.answers;
    }

    getCorrectAnswer() {
        return this.correctAnswer;
    }

    getQuizIndex() {
        return this.quizIndex;
    }
}

export default Part;