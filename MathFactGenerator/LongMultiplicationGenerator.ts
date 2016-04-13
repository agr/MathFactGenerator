import { FactGenerator } from './FactGenerator';
import { BasicNumberGenerator } from './BasicNumberGenerator';

export class LongMultiplicationGenerator implements FactGenerator {
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
        tle.className = 'configuration long-multiplication';
        tle.innerHTML = '<div class="caption">Long multiplication</div>';
        tle.appendChild(this.leftOperandDescription.createConfigurationElement('Left operand'));
        tle.appendChild(this.rightOperandDescription.createConfigurationElement('Right operand'));
        tle.appendChild(this.resultDescription.createConfigurationElement('Result'));

        return tle;
    }

    generateFact(): HTMLElement {
        var container: HTMLElement = document.createElement('div');
        container.className = 'fact-container long-multiplication';

        var maxDigits: number = 0;

        var div: HTMLElement = document.createElement('div');
        container.appendChild(div);
        div.className = 'operand';
        var n: number = this.leftOperandDescription.generate();
        var nd: number = n.toString().length;
        maxDigits = Math.max(maxDigits, nd);
        var r = n;
        div.innerHTML = n.toString();

        div = document.createElement('div');
        container.appendChild(div);
        div.className = 'operand';
        n = this.rightOperandDescription.generate();
        r *= n;
        nd = n.toString().length;
        maxDigits = Math.max(maxDigits, nd);
        div.innerHTML = '&times;' + n;

        var hr = document.createElement('hr');
        container.appendChild(hr);
        var spc = document.createElement('div');
        spc.className = 'result-placeholder';
        spc.innerHTML = '&nbsp;';
        container.appendChild(spc);

        container.style.width = r.toString().length.toString() + 'em';

        return container;
    }
}
