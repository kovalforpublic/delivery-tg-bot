import { ShavermaSize } from "./shaverma-size.enum";
import { ShavermaState } from "./shaverma.abstract-class";

const { XS, M, XL } = ShavermaSize;
export class ShavermaCheese extends ShavermaState {
    public readonly caption = 'Сырная';
    protected size = M;
    protected priceMap = new Map([
        [XS, 185],
        [M, 225],
        [XL, 385],
    ])
    protected sizeMap = new Map([
        [XS, 320],
        [M, 420],
        [XL, 640],
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