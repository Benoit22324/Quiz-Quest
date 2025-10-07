import type { PartialQuiz } from "./Quiz";

class Run {
    constructor(
        private id: string,
        private result: string,
        private createdAt: string,
        private quiz: PartialQuiz
    ) { }

    getId() {
        return this.id;
    }

    getResult() {
        return this.result;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getQuiz() {
        return this.quiz;
    }
}

export default Run;