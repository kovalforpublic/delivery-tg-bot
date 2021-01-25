import { ShavermaState } from "./shaverma.abstract-class";
import { ShavermaSize } from './shaverma-size.enum';

const { XS, M, XL } = ShavermaSize;
export class ShavermaMushroom extends ShavermaState {
    public readonly caption = 'Грибная';
    protected size = M;
    protected priceMap = new Map([
        [XS, 195],
        [M, 235],
        [XL, 365],
    ])
    protected sizeMap = new Map([
        [XS, 310],
        [M, 460],
        [XL, 620],
    ])
    public getPrice() {
        const { size } = this;
        return this.priceMap.get(size);
    }
    public getWeight() {
        const { size } = this;
        return this.sizeMap.get(size);
    }
    public setSize(size: ShavermaSize) {
        this.size = size;
    }
    public getSize(): number {
        return this.size;
    }
}