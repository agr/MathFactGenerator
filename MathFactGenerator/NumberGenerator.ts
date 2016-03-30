export interface NumberGenerator {
    createConfigurationElement(caption: string): HTMLElement;
    generate(): number;
}