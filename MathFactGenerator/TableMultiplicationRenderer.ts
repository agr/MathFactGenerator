import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';
import { MultiplicationGenerator, MultiplicationFact } from './MultiplicationGenerator';

export class TableMultiplicationRenderer implements FactGenerator {
    gen: MultiplicationGenerator;

    constructor() {
        this.gen = new MultiplicationGenerator();
        this.gen.leftOperandDescription.minValue = 0;
        this.gen.leftOperandDescription.maxValue = 12;
        this.gen.rightOperandDescription.minValue = 0;
        this.gen.rightOperandDescription.maxValue = 12;
    }

    createConfigurationElement(): HTMLElement {
        var cfg: HTMLElement = document.createElement('div');
        cfg.className = 'configuration table-multiplication';
        cfg.innerHTML = '<div>Horizontal multiplication</div>';
        cfg.appendChild(this.gen.leftOperandDescription.createConfigurationElement('Left operand'));
        cfg.appendChild(this.gen.rightOperandDescription.createConfigurationElement('Right operand'));
        cfg.appendChild(this.gen.resultDescription.createConfigurationElement('Result'));

        return cfg;
    }

    generateFact(): HTMLElement {
        var fact: HTMLElement = document.createElement('div');
        fact.className = 'fact-container table-multiplication';

        var r: MultiplicationFact = this.gen.generateFact();

        if (r === null) {
            return null;
        }

        fact.innerHTML = "<span class='operand'>" + r.left + "</span>&times;<span class='operand'>" + r.right + "</span>=<span class='result-placeholder'>&nbsp;</span>";
        var rp: HTMLElement = <HTMLElement>fact.getElementsByClassName('result-placeholder')[0];
        rp.style.width = '3em';
        rp.style.display = 'inline-block';
        return fact;
    }
}