import { BasicNumberGenerator } from './BasicNumberGenerator';

export class MultiplicationFact {
    left: number;
    right: number;
    result: number;
}

export class MultiplicationGenerator {
    leftOperandDescription: BasicNumberGenerator;
    rightOperandDescription: BasicNumberGenerator;
    resultDescription: BasicNumberGenerator;

    constructor() {
        this.leftOperandDescription = new BasicNumberGenerator();
        this.rightOperandDescription = new BasicNumberGenerator();
        this.resultDescription = new BasicNumberGenerator();
    }

    generateFact(): MultiplicationFact {
        var r: MultiplicationFact = new MultiplicationFact();

        this.leftOperandDescription.reset();
        this.rightOperandDescription.reset();
        this.resultDescription.reset();

        if (this.leftOperandDescription.getCurrentMin() * this.rightOperandDescription.getCurrentMax() < this.resultDescription.getCurrentMin()) {
            this.leftOperandDescription.tempMinValue = Math.ceil(this.resultDescription.getCurrentMin() / this.rightOperandDescription.getCurrentMax());
        }
        if (this.leftOperandDescription.getCurrentMax() * this.rightOperandDescription.getCurrentMin() < this.resultDescription.getCurrentMin()) {
            this.rightOperandDescription.tempMinValue = Math.ceil(this.resultDescription.getCurrentMin() / this.leftOperandDescription.getCurrentMax());
        }
        if (this.leftOperandDescription.getCurrentMax() * this.rightOperandDescription.getCurrentMin() < this.resultDescription.getCurrentMax()) {
            this.leftOperandDescription.tempMaxValue = Math.floor(this.resultDescription.getCurrentMax() / this.rightOperandDescription.getCurrentMin());
        }
        if (this.leftOperandDescription.getCurrentMin() * this.rightOperandDescription.getCurrentMax() < this.resultDescription.getCurrentMax()) {
            this.rightOperandDescription.tempMaxValue = Math.floor(this.resultDescription.getCurrentMax() / this.leftOperandDescription.getCurrentMin());
        }

        if (!(this.leftOperandDescription.canGenerate() && this.rightOperandDescription.canGenerate())) {
            return null;
        }

        var failCount: number = 0;
        var allRestrictionsMet: boolean = false;

        do {
            r.left = this.leftOperandDescription.generate();
            this.rightOperandDescription.tempMinValue = Math.ceil(this.resultDescription.getCurrentMin() / r.left);
            this.rightOperandDescription.tempMaxValue = Math.floor(this.resultDescription.getCurrentMax() / r.left);

            if (!this.rightOperandDescription.canGenerate()) {
                ++failCount;
            }
            else {
                r.right = this.rightOperandDescription.generate();
                r.result = r.left * r.right;
                allRestrictionsMet = true;
            }
            this.rightOperandDescription.reset();
        } while (!allRestrictionsMet && failCount < 100);

        if (!allRestrictionsMet) {
            return null;
        }

        return r;
    }
}