import { ShavermaSize } from "./shaverma-size.enum";
import { ShavermaState } from "./shaverma.abstract-class";

const { XS, M, XL } = ShavermaSize;
export class ShavermaGreek extends ShavermaState {
    public readonly caption = "Греческая";
    protected size = M;
    protected priceMap = new Map([
        [XS, 195],
        [M, 235],
        [XL, 365],
    ])
    protected sizeMap = new Map([
        [XS, 305],
        [M, 450],
        [XL, 610],
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