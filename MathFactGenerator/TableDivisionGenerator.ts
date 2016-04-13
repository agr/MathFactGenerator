import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';

export class TableDivisionGenerator implements FactGenerator {
    gen: BasicNumberGenerator;

    constructor() {
        this.gen = new BasicNumberGenerator();
        this.gen.minValue = 1;
        this.gen.maxValue = 12;
    }

    createConfigurationElement(): HTMLElement {
        var cfg: HTMLElement = document.createElement('div');
        cfg.className = 'configuration table-division';
        cfg.innerHTML = 'table division';

        return cfg;
    }

    generateFact(): HTMLElement {
        var fact: HTMLElement = document.createElement('div');
        fact.className = 'fact-container table-division';

        var result: number = this.gen.generate();
        var right: number = this.gen.generate();
        var left = result * right;

        fact.innerHTML = "<span class='operand'>" + left + "</span>&divide;<span class='operand'>" + right + "</span>=<span class='result-placeholder'>&nbsp;</span>";
        var rp: HTMLElement = <HTMLElement>fact.getElementsByClassName('result-placeholder')[0];
        rp.style.width = '3em';
        rp.style.display = 'inline-block';
        return fact;
    }
}