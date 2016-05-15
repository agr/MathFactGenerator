import { NumberGenerator } from './NumberGenerator';

export class BasicNumberGenerator implements NumberGenerator {
    minDigits: number;
    maxDigits: number;
    minValue: number;
    maxValue: number;

    tempMaxValue: number;
    tempMinValue: number;

    createConfigurationElement(caption: string): HTMLElement {
        var opCfg: HTMLElement = document.createElement('div');
        opCfg.innerHTML = [
            '<div>' + caption + '</div>',
            '<div>Digits: <input type="number" class="min-digits" ' + (typeof this.minDigits !== 'undefined' ? `value="${this.minDigits}"` : '') + '>',
            '&ndash;<input type="number" class="max-digits" ' + (typeof this.maxDigits !== 'undefined' ? `value="${this.maxDigits}"` : '') + '></div>',
            '<div>Value: <input type="number" class="min-value" ' + (typeof this.minValue !== 'undefined' ? `value="${this.minValue}"` : '') + '>',
            '&ndash;<input type="number" class="max-value" ' + (typeof this.maxValue !== 'undefined' ? `value="${this.maxValue}"` : '') + '></div>'
        ].join('');

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
        var min: number = this.getCurrentMin();
        var max: number = this.getCurrentMax();

        var rnd: number = Math.random();
        var result = min + Math.floor(rnd * (max - min + 1));
        return result;
    }

    getCurrentMax(): number {
        var max: number = 999999999;
        if (typeof this.maxDigits === 'number') {
            max = Math.pow(10, this.maxDigits) - 1;
        }
        if (typeof this.maxValue === 'number') {
            max = Math.min(max, this.maxValue);
        }
        if (typeof this.tempMaxValue === 'number') {
            max = Math.min(max, this.tempMaxValue);
        }
        return max;
    }

    getCurrentMin(): number {
        var min: number = -999999999;
        if (typeof this.minDigits === 'number') {
            if (this.minDigits === 1) {
                min = 0;
            } else {
                min = Math.pow(10, this.minDigits - 1);
            }
        }
        if (typeof this.minValue === 'number') {
            min = Math.max(min, this.minValue);
        }
        if (typeof this.tempMinValue === 'number') {
            min = Math.max(min, this.tempMinValue);
        }
        return min;
    }

    reset(): void {
        this.tempMaxValue = undefined;
        this.tempMinValue = undefined;
    }

    canGenerate(): boolean {
        return this.getCurrentMin() <= this.getCurrentMax();
    }
}
