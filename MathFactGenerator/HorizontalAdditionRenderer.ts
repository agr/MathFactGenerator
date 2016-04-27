﻿import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';
import { AdditionGenerator, AdditionFact } from './AdditionGenerator';

export class HorizontalAdditionRenderer implements FactGenerator {
    gen: AdditionGenerator;

    constructor() {
        this.gen = new AdditionGenerator();
    }

    createConfigurationElement(): HTMLElement {
        var tle: HTMLElement = document.createElement('div');
        tle.className = 'configuration horizontal-addition';
        tle.innerHTML = '<div class="caption">Horizontal addition</div>';
        tle.appendChild(this.gen.leftOperandDescription.createConfigurationElement('Left operand'));
        tle.appendChild(this.gen.rightOperandDescription.createConfigurationElement('Right operand'));
        tle.appendChild(this.gen.resultDescription.createConfigurationElement('Result'));

        return tle;
    }

    generateFact(): HTMLElement {
        var n: AdditionFact = this.gen.generateNumbers();

        if (n === null) {
            return null;
        }

        var fact: HTMLElement = document.createElement('div');
        fact.className = 'fact-container horizontal-addition';
        fact.innerHTML = "<span class='operand'>" + n.left + "</span>+<span class='operand'>" + n.right + "</span>=<span class='result-placeholder'>&nbsp;</span>";
        var rp: HTMLElement = <HTMLElement>fact.getElementsByClassName('result-placeholder')[0];
        rp.style.width = '3em';
        rp.style.display = 'inline-block';
        return fact;
    }
}