import { FactGenerator } from './FactGenerator';
import { FactGeneratorInstantiator } from './FactGeneratorInstantiator';

export class GeneratorManager {
    private generators: Array<FactGenerator>;
    private instantiators: Array<FactGeneratorInstantiator>;

    constructor() {
        this.generators = new Array<FactGenerator>();
        this.instantiators = new Array<FactGeneratorInstantiator>();
    }

    addInstantiator(instantiator: FactGeneratorInstantiator, title: string): void {
        this.instantiators.push(instantiator);
        var pickerArea: HTMLElement = document.getElementById('generator-picker-area');
        var picker: HTMLElement = document.createElement('div');
        picker.className = 'picker';
        picker.innerHTML = '<div class="title">' + title + '</div><div class="add-btn-container"><button class="add-generator">Add</button></div>';
        pickerArea.appendChild(picker);
        var btn: HTMLElement = <HTMLElement>picker.getElementsByClassName('add-generator')[0];
        btn.onclick = () => { this.addGenerator(instantiator()) };
    }

    addGenerator(generator: FactGenerator): void {
        this.generators.push(generator);
        var cfgRoot: HTMLElement = document.getElementById('configuration');
        var cfgElem: HTMLElement = document.createElement('div');
        cfgElem.className = 'configuration-container';
        cfgElem.innerHTML = '<div class="close">&times;</div>';

        cfgRoot.appendChild(cfgElem);
        var n: HTMLElement = generator.createConfigurationElement();
        cfgElem.appendChild(n);

        var closeBtn: HTMLElement = <HTMLElement>cfgElem.getElementsByClassName('close')[0];
        closeBtn.onclick = () => {
            var idx = this.generators.indexOf(generator);
            this.generators.splice(idx, 1);
            cfgRoot.removeChild(cfgElem);
        };
    }

    generateFacts(): void {
        if (this.generators.length === 0) {
            return;
        }

        var resultRoot: HTMLElement = document.getElementById('facts');
        var amountEl: HTMLInputElement = <HTMLInputElement>document.getElementById('amount');
        var amount: number = parseInt(amountEl.value) || 20;
        for (var i = 0; i < amount; ++i) {
            var n: HTMLElement = null;
            var failCount: number = 0;
            while (n === null && ++failCount < 100) {
                var idx: number = Math.floor(Math.random() * this.generators.length);
                n = this.generators[idx].generateFact();
            }
            if (n !== null) {
                resultRoot.appendChild(n);
            }
        }
    }

    clear(): void {
        var resultRoot: HTMLElement = document.getElementById('facts');
        resultRoot.innerHTML = '';
    }
}
