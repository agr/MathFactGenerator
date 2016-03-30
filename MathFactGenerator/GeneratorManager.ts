import { FactGenerator } from './FactGenerator';

export class GeneratorManager {
    private generators: Array<FactGenerator>;

    constructor() {
        this.generators = new Array<FactGenerator>();
    }

    addGenerator(generator: FactGenerator): void {
        this.generators.push(generator);
    }

    buildConfigurator(): void {
        var cfgRoot: HTMLElement = document.getElementById('configuration');
        for (var i = 0; i < this.generators.length; ++i) {
            var n: HTMLElement = this.generators[i].createConfigurationElement();
            cfgRoot.appendChild(n);
        }
    }

    generateFacts(): void {
        var resultRoot: HTMLElement = document.getElementById('facts');
        for (var i = 0; i < 20; ++i) {
            var idx: number = Math.floor(Math.random() * this.generators.length);
            var n: HTMLElement = this.generators[idx].generateFact();
            resultRoot.appendChild(n);
        }
    }
}
