import { ShavermaState } from "./shaverma.abstract-class";
import { ShavermaSize } from './shaverma-size.enum';

const { XS, M, XL } = ShavermaSize;
export class ShavermaMeatmix extends ShavermaState {
    public readonly caption = "Мясо-микс";
    protected size = M;
    protected priceMap = new Map([
        [XS, 215],
        [M, 255],
        [XL, 385],
    ])
    protected sizeMap = new Map([
        [XS, 310],
        [M, 430],
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