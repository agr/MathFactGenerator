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
        if (Math.random() < 0.5) {
            return MultiplicationGenerator.generate(this.leftOperandDescription, this.rightOperandDescription, this.resultDescription);
        } else {
            var r: MultiplicationFact = MultiplicationGenerator.generate(this.rightOperandDescription, this.leftOperandDescription, this.resultDescription);
            if (!r) {
                return null;
            }

            var t: number = r.left;
            r.left = r.right;
            r.right = t;
            return r;
        }
    }

    private static generate(left: BasicNumberGenerator, right: BasicNumberGenerator, result: BasicNumberGenerator): MultiplicationFact {
        var r: MultiplicationFact = new MultiplicationFact();

        left.reset();
        right.reset();
        result.reset();

        if (left.getCurrentMin() * right.getCurrentMax() < result.getCurrentMin()) {
            left.tempMinValue = Math.ceil(result.getCurrentMin() / right.getCurrentMax());
        }
        if (left.getCurrentMax() * right.getCurrentMin() < result.getCurrentMin()) {
            right.tempMinValue = Math.ceil(result.getCurrentMin() / left.getCurrentMax());
        }
        if (left.getCurrentMax() * right.getCurrentMin() < result.getCurrentMax()) {
            left.tempMaxValue = Math.floor(result.getCurrentMax() / right.getCurrentMin());
        }
        if (left.getCurrentMin() * right.getCurrentMax() < result.getCurrentMax()) {
            right.tempMaxValue = Math.floor(result.getCurrentMax() / left.getCurrentMin());
        }

        if (!(left.canGenerate() && right.canGenerate())) {
            return null;
        }

        var failCount: number = 0;
        var allRestrictionsMet: boolean = false;

        do {
            r.left = left.generate();
            right.tempMinValue = Math.ceil(result.getCurrentMin() / r.left);
            right.tempMaxValue = Math.floor(result.getCurrentMax() / r.left);

            if (!right.canGenerate()) {
                ++failCount;
            }
            else {
                r.right = right.generate();
                r.result = r.left * r.right;
                allRestrictionsMet = true;
            }
            right.reset();
        } while (!allRestrictionsMet && failCount < 100);

        if (!allRestrictionsMet) {
            return null;
        }

        return r;
    }
}