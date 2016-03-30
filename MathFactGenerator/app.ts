interface FactGenerator {
    createConfigurationElement(): HTMLElement;
    generateFact(): HTMLElement;
}

interface NumberGenerator {
    createConfigurationElement(caption: string): HTMLElement;
    generate(): number;
}

class BasicNumberGenerator implements NumberGenerator {
    minDigits: number;
    maxDigits: number;
    minValue: number;
    maxValue: number;

    createConfigurationElement(caption: string): HTMLElement {
        var opCfg: HTMLElement = document.createElement('div');
        opCfg.innerHTML = '<div>' + caption + '</div><div>Digits: <input type="number" class="min-digits">&ndash;<input type="number" class="max-digits"></div><div>Value: <input type="number" class="min-value">&ndash;<input type="number" class="max-value"></div>';

        var minDigits: HTMLElement = <HTMLElement>opCfg.getElementsByClassName('min-digits')[0];
        var maxDigits: HTMLElement = <HTMLElement>opCfg.getElementsByClassName('max-digits')[0];
        var minValue: HTMLElement = <HTMLElement>opCfg.getElementsByClassName('min-value')[0];
        var maxValue: HTMLElement = <HTMLElement>opCfg.getElementsByClassName('max-value')[0];
        var _this: BasicNumberGenerator = this;
        minDigits.onblur = function () { _this.minDigits = this.value == '' ? undefined : parseInt(this.value); };
        maxDigits.onblur = function () { _this.maxDigits = this.value == '' ? undefined : parseInt(this.value); };
        minValue.onblur = function () { _this.minValue = this.value == '' ? undefined : parseInt(this.value); };
        maxValue.onblur = function () { _this.maxValue = this.value == '' ? undefined : parseInt(this.value); };

        return opCfg;
    }

    generate(): number {
        var min: number = -999999999;
        if (typeof this.minDigits === 'number') {
            min = Math.pow(10, this.minDigits - 1);
        }
        if (typeof this.minValue === 'number') {
            min = Math.max(min, this.minValue);
        }

        var max: number = 999999999;
        if (typeof this.maxDigits === 'number') {
            max = Math.pow(10, this.maxDigits);
        }
        if (typeof this.maxValue === 'number') {
            max = Math.min(max, this.maxValue);
        }

        return min + Math.floor(Math.random() * (max - min));
    }
}

class GeneratorManager {
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

class LongMultiplicationGenerator implements FactGenerator {
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

        tle.appendChild(this.leftOperandDescription.createConfigurationElement('Left operand'));
        tle.appendChild(this.rightOperandDescription.createConfigurationElement('Right operand'));
        tle.appendChild(this.resultDescription.createConfigurationElement('Result'));

        return tle;
    }

    generateFact(): HTMLElement {
        var container: HTMLElement = document.createElement('div');
        container.className = 'fact-container';

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
        spc.innerHTML = '&nbsp;';
        container.appendChild(spc);

        container.style.width = r.toString().length.toString() + 'em';

        return container;
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var f = document.getElementById('facts');
    var genBtn = document.getElementById('btn-generate');

    var gm: GeneratorManager = new GeneratorManager();
    gm.addGenerator(new LongMultiplicationGenerator());
    gm.buildConfigurator();

    genBtn.onclick = () => { gm.generateFacts(); };
};
