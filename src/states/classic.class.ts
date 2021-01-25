import { ShavermaState } from "./shaverma.abstract-class";
import { ShavermaSize } from './shaverma-size.enum';
const { XS, M, XL } = ShavermaSize;
export class ShavermaClassic extends ShavermaState {
    public readonly caption = 'Классическая';
    protected size: ShavermaSize = M;
    protected priceMap = new Map([
        [XS, 155],
        [M, 185],
        [XL, 285],
    ])
    protected sizeMap = new Map([
        [XS, 280],
        [M, 350],
        [XL, 580],
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
    public getSize(): ShavermaSize {
        return this.size;
    }
}