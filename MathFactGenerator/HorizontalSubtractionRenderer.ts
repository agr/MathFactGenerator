import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';
import { AdditionGenerator, AdditionFact } from './AdditionGenerator';

export class HorizontalSubtractionRenderer implements FactGenerator {
    gen: AdditionGenerator;

    constructor() {
        this.gen = new AdditionGenerator();
    }

    createConfigurationElement(): HTMLElement {
        var tle: HTMLElement = document.createElement('div');
        tle.className = 'configuration horizontal-subtraction';
        tle.innerHTML = '<div class="caption">Horizontal subtraction</div>';
        tle.appendChild(this.gen.resultDescription.createConfigurationElement('Left operand'));
        tle.appendChild(this.gen.rightOperandDescription.createConfigurationElement('Right operand'));
        tle.appendChild(this.gen.leftOperandDescription.createConfigurationElement('Result'));

        return tle;
    }

    generateFact(): HTMLElement {
        var n: AdditionFact = this.gen.generateNumbers();

        if (n === null) {
            return null;
        }

        var fact: HTMLElement = document.createElement('div');
        fact.className = 'fact-container horizontal-subtraction';
        fact.innerHTML = "<span class='operand'>" + n.result + "</span>&minus;<span class='operand'>" + n.right + "</span>=<span class='result-placeholder'>&nbsp;</span>";
        var rp: HTMLElement = <HTMLElement>fact.getElementsByClassName('result-placeholder')[0];
        rp.style.width = '3em';
        rp.style.display = 'inline-block';
        return fact;
    }
}