import { ShavermaState } from "./shaverma.abstract-class";
import { ShavermaSize } from './shaverma-size.enum';

const { XS, M, XL } = ShavermaSize;
export class ShavermaFalafel extends ShavermaState {
    public readonly caption = "Фалафель";
    protected size = M;
    protected priceMap = new Map([
        [M, 175],
    ])
    protected sizeMap = new Map([
        [M, 340]
    ])
    public getPrice() {
        return this.priceMap.get(M);
    }
    public getWeight() {
        return this.sizeMap.get(M);
    }
    public setSize(size: ShavermaSize) {
        this.size = size;
    }
    public getSize(): number {
        return this.size;
    }
}