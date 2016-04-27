import { BasicNumberGenerator } from './BasicNumberGenerator';

export class AdditionFact {
    left: number;
    right: number;
    result: number;
}

export class AdditionGenerator {
    leftOperandDescription: BasicNumberGenerator;
    rightOperandDescription: BasicNumberGenerator;
    resultDescription: BasicNumberGenerator;

    constructor() {
        this.leftOperandDescription = new BasicNumberGenerator();
        this.rightOperandDescription = new BasicNumberGenerator();
        this.resultDescription = new BasicNumberGenerator();
    }

    generateNumbers(): AdditionFact {
        var allRestrictionsMet: boolean = false;
        var r: AdditionFact = new AdditionFact();
        this.leftOperandDescription.reset();
        this.rightOperandDescription.reset();
        this.resultDescription.reset();
        if (this.leftOperandDescription.getCurrentMin() + this.rightOperandDescription.getCurrentMax() < this.resultDescription.getCurrentMin()) {
            this.leftOperandDescription.tempMinValue = this.resultDescription.getCurrentMin() - this.rightOperandDescription.getCurrentMax();
        }
        if (this.leftOperandDescription.getCurrentMax() + this.rightOperandDescription.getCurrentMin() < this.resultDescription.getCurrentMin()) {
            this.rightOperandDescription.tempMinValue = this.resultDescription.getCurrentMin() - this.leftOperandDescription.getCurrentMax();
        }
        if (this.leftOperandDescription.getCurrentMax() + this.rightOperandDescription.getCurrentMin() > this.resultDescription.getCurrentMax()) {
            this.leftOperandDescription.tempMaxValue = this.resultDescription.getCurrentMax() - this.rightOperandDescription.getCurrentMin();
        }
        if (this.leftOperandDescription.getCurrentMin() + this.rightOperandDescription.getCurrentMax() > this.resultDescription.getCurrentMax()) {
            this.rightOperandDescription.tempMaxValue = this.resultDescription.getCurrentMax() - this.leftOperandDescription.getCurrentMin();
        }

        if (!(this.leftOperandDescription.canGenerate() && this.rightOperandDescription.canGenerate())) {
            return null;
        }

        var failCount: number = 0;

        do {
            r.left = this.leftOperandDescription.generate();
            // left + right >= result.min => right >= result.min - left => right.min = result.min - left
            this.rightOperandDescription.tempMinValue = this.resultDescription.getCurrentMin() - r.left;
            // left + right <= result.max => right <= result.max - left => right.max = result.max - left
            this.rightOperandDescription.tempMaxValue = this.resultDescription.getCurrentMax() - r.left;

            if (!this.rightOperandDescription.canGenerate()) {
                ++failCount;
            }
            else {
                r.right = this.rightOperandDescription.generate();
                r.result = r.left + r.right;
                allRestrictionsMet = true;
            }
            this.rightOperandDescription.reset();
        } while (!allRestrictionsMet && failCount < 100);

        if (failCount >= 100) {
            return null;
        }

        return r;
    }
}
