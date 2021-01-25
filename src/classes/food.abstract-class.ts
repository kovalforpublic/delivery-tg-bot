import { State } from "src/states/state.abstract-state";
import { ShavermaSize, TShavermaState } from "../states";
import { Customer } from "./customer.class";

export abstract class Food<T extends State<ShavermaSize, ShavermaSize>> {
    protected abstract state: T;
    protected abstract _customer: Customer;
    public abstract get price(): number;
    public abstract get prices(): number[];
    public abstract get weight(): number;
    public abstract get weights(): number[];
    public abstract get caption(): string;
}