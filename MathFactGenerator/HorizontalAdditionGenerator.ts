import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';

export class HorizontalAdditionGenerator implements FactGenerator {
    leftOperandDescription: BasicNumberGenerator;
    rightOperandDescription: BasicNumberGenerator;
    resultDescription: BasicNumberGenerator;

    constructor() {
        this.leftOperandDescription = new BasicNumberGenerator();
        this.rightOperandDescription = new BasicNumberGenerator();
        this.resultDescription = new BasicNumberGenerator();
    }

    createConfigurationElement(): HTMLElement {
        var tle: HTMLElement = document.createElement('div');
        tle.className = 'configuration horizontal-addition';

        tle.appendChild(this.leftOperandDescription.createConfigurationElement('Left operand'));
        tle.appendChild(this.rightOperandDescription.createConfigurationElement('Right operand'));
        tle.appendChild(this.resultDescription.createConfigurationElement('Result'));

        return tle;
    }

    generateFact(): HTMLElement {
        var fact: HTMLElement = document.createElement('div');
        fact.className = 'fact-container horizontal-addition';

        var left: number = this.leftOperandDescription.generate();
        var right: number = this.rightOperandDescription.generate();
        var result = left + right;

        fact.innerHTML = "<span class='operand'>" + left + "</span>+<span class='operand'>" + right + "</span>=<span class='result-placeholder'>&nbsp;</span>";
        var rp: HTMLElement = <HTMLElement>fact.getElementsByClassName('result-placeholder')[0];
        rp.style.width = '3em';
        rp.style.display = 'inline-block';
        return fact;
    }
}