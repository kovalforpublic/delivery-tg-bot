import { Food } from "./food.abstract-class";
import { ShavermaSize, TShavermaState  } from "../states";
import { Customer } from "./customer.class";

export class Shaverma extends Food<TShavermaState> {
    protected _customer: Customer;
    constructor(protected state: TShavermaState) {
        super();
    }

    public get price(): number {
        return this.state.getPrice();
    };
    public get weight(): number {
        return this.state.getWeight();
    }
    public get prices(): number[] {
        return this.state.getPrices();
    }
    public get weights(): number[] {
        return this.state.getWeights();
    }

    public get caption(): string {
        return this.state.caption;
    }
    public get size(): ShavermaSize {
        return this.state.getSize();
    }

    public get chatId(): number {
        return this._customer.chatId;
    }
    public get username(): string {
        return this._customer.name;
    }
    
    public set customer(customer: Customer) {
        this._customer = customer;
    }
    public setSize(size: ShavermaSize) {
        this.state.setSize(size);
    }

}