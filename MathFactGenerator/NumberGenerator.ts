export interface NumberGenerator {
    createConfigurationElement(caption: string): HTMLElement;
    generate(): number;
    getCurrentMax(): number;
    getCurrentMin(): number;
    reset(): void;
}