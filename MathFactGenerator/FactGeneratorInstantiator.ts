import { FactGenerator } from './FactGenerator';

export interface FactGeneratorInstantiator {
    (): FactGenerator;
}