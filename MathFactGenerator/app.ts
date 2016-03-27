class NumberDescription {
    minDigits: number;
    maxDigits: number;
    minValue: number;
    maxValue: number;
}

interface FactGenerator {
    (operands: Array<NumberDescription>, result: NumberDescription): HTMLElement;
}

function generateNumber(descr: NumberDescription): number {
    var min: number = -999999999;
    if (typeof descr.minDigits === 'number') {
        min = Math.pow(10, descr.minDigits - 1);
    }
    if (typeof descr.minValue === 'number') {
        min = Math.max(min, descr.minValue);
    }

    var max: number = 999999999;
    if (typeof descr.maxDigits === 'number') {
        max = Math.pow(10, descr.maxDigits);
    }
    if (typeof descr.maxValue === 'number') {
        max = Math.min(max, descr.maxValue);
    }

    return min + Math.floor(Math.random() * (max - min));
}

function GenerateLongMultiplication(operands: Array<NumberDescription>, result: NumberDescription): HTMLElement {
    var container: HTMLElement = document.createElement('div');
    container.className = 'fact-container';

    var maxDigits: number = 0;

    for (var i: number = 0; i < operands.length; ++i) {
        var div: HTMLElement = document.createElement('div');
        container.appendChild(div);
        div.className = 'operand';
        var n: number = generateNumber(operands[i]);
        var nd: number = ('' + n).length;
        if (nd > maxDigits) {
            maxDigits = nd;
        }
        var prefix: string = '';
        if (i == 1) {
            prefix = '&times;'
        }

        div.innerHTML = prefix + n;
    }

    var hr = document.createElement('hr');
    container.appendChild(hr);
    var spc = document.createElement('div');
    spc.innerHTML = '&nbsp;';
    container.appendChild(spc);

    container.style.width = '' + (maxDigits + 1) + 'em';

    return container;
}

function generate(parent: HTMLElement) {
    var operands: Array<NumberDescription> = [<NumberDescription>{ minDigits: 3, maxDigits: 3 }, <NumberDescription>{ minDigits: 2, maxDigits: 2 }];
    for (var i = 0; i < 10; ++i) {
        var el = GenerateLongMultiplication(operands, <NumberDescription>{});
        parent.appendChild(el);
    }
}

window.onload = () => {
    var el = document.getElementById('content');
    var f = document.getElementById('facts');
    generate(f);
};