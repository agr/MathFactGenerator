import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';

export class TableMultiplicationGenerator implements FactGenerator {
    gen: BasicNumberGenerator;

    constructor() {
        this.gen = new BasicNumberGenerator();
        this.gen.minValue = 0;
        this.gen.maxValue = 12;
    }

    createConfigurationElement(): HTMLElement {
        var cfg: HTMLElement = document.createElement('div');
        cfg.className = 'configuration table-multiplication';
        cfg.innerHTML = 'table multiplication';

        return cfg;
    }

    generateFact(): HTMLElement {
        var fact: HTMLElement = document.createElement('div');
        fact.className = 'fact-container table-multiplication';

        var left: number = this.gen.generate();
        var right: number = this.gen.generate();
        var result = left * right;

        fact.innerHTML = "<span class='operand'>" + left + "</span>&times;<span class='operand'>" + right + "</span>=<span class='result-placeholder'>&nbsp;</span>";
        var rp: HTMLElement = <HTMLElement>fact.getElementsByClassName('result-placeholder')[0];
        rp.style.width = '3em';
        rp.style.display = 'inline-block';
        return fact;
    }
}