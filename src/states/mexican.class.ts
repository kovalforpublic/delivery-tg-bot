import { ShavermaState } from "./shaverma.abstract-class";
import { ShavermaSize } from './shaverma-size.enum';

const { XS, M, XL } = ShavermaSize;
export class ShavermaMexican extends ShavermaState {
    public readonly caption = 'Мексиканская';
    protected size = M;
    protected priceMap = new Map([
        [XS, 185],
        [M, 225],
        [XL, 345],
    ])
    protected sizeMap = new Map([
        [XS, 325],
        [M, 430],
        [XL, 625],
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