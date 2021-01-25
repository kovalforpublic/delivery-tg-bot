
export abstract class State<T, K> {
    protected abstract priceMap: Map<T, number>;
    protected abstract sizeMap: Map<K, number>;

    public abstract getPrice(): number;
    public abstract getWeight(): number;

    public abstract getWeights(): number[];
    public abstract getPrices(): number[];
}