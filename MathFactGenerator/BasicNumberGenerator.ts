import { NumberGenerator } from './NumberGenerator';

export class BasicNumberGenerator implements NumberGenerator {
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

        return min + Math.floor(Math.random() * (max - min + 1));
    }
}
