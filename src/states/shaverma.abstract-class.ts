import { ShavermaSize } from "./shaverma-size.enum";
import { State } from "./state.abstract-state";

const { XS, M, XL } = ShavermaSize;
export abstract class ShavermaState extends State<ShavermaSize, ShavermaSize> {
    public abstract readonly caption: string;
    protected abstract size: ShavermaSize; 
    protected abstract priceMap: Map<ShavermaSize, number>;
    protected abstract sizeMap: Map<ShavermaSize, number>;

    public abstract setSize(size: ShavermaSize);
    public abstract getSize(): number;
    public getWeights(): number[] {
        const xs = this.sizeMap.get(XS);
        const m = this.sizeMap.get(M);
        const xl = this.sizeMap.get(XL);
        return [xs, m, xl];
    }
    public getPrices(): number[] {
        const xs = this.priceMap.get(XS);
        const m = this.priceMap.get(M);
        const xl = this.priceMap.get(XL);
        return [xs, m, xl];
    }
}