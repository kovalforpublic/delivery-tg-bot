import "reflect-metadata";
import { lowCased } from "../decorators";

import { ShavermaType } from "./shaverma-type.enum";
import { Shaverma } from "./shaverma.class";
import { ShavermaFactory } from "./shaverma.factory";
import { ShavermaSize } from "../states/shaverma-size.enum";

const { XS, M, XL } = ShavermaSize;
const { CLASSIC, CHEESE, MEAT_MIX, MEXICAN, GREEK, MUSHROOM, VEGGIE, FALAFEL } = ShavermaType;

export class ShavermaShop {
    protected _isOpen: boolean = true;
    protected readonly factory = new ShavermaFactory();
    protected readonly choiceMap = new Map<string, ShavermaType>([
        ['классическая', CLASSIC],
        ['сырная', CHEESE],
        ['грибная', MUSHROOM],
        ['мексиканская', MEXICAN],
        ['мясо-микс', MEAT_MIX],
        ['фалафель', FALAFEL],
        ['греческая', GREEK],
    ]);
    protected readonly sizeMap = {
        'XS (маленькая)': XS,
        'M (средняя)': M,
        'XL (большая)': XL,
        0: 'XS (маленькая)',
        1: 'M (средняя)',
        2: 'XL (большая)',
    };
    protected readonly labels: string[] = ['классическая', 'сырная', 'грибная', 'мексиканская', 'мясо-микс', 'фалафель', 'греческая'];
    protected readonly sizes: string[] = ['XS (маленькая)', 'M (средняя)', 'XL (большая)'];
    protected readonly adminId: number = 728175421;
    protected readonly admin: string = 'kforp';
    protected orders: Shaverma[] = [];

    public add(shaverma: Shaverma): number {
        return this.orders.push(shaverma);
    }

    @lowCased
    public getNew(text: string = "классическая"): Shaverma {
        const type = this.choiceMap.get(text);
        return this.factory.getInstance(type);
    }
    /** get shaverma by chatId, if order exists */
    public get(id: number): Shaverma | null {
        const found = this.orders.find(order => {
            return order.chatId === id;
        })
        return found ? found : null;
    }
    public getAll() {
        return this.orders;
    }
    public getSizeCaption(size: ShavermaSize) {
        return this.sizeMap[size];
    }
    public getAdminId(): number {
        return this.adminId;
    }
    public getSize(text: string) {
        return this.sizeMap[text];
    }

    public isSizeLabel(text: string): boolean {
        return this.sizes.includes(text);
    }
    /** is shaverma label */
    @lowCased
    public isLabel(text: string): boolean {
        return this.labels.includes(text);
    }
    public isAdmin(name: string): boolean {
        return this.admin === name;
    }
    public isOpen(): boolean {
        return this._isOpen;
    }
    public isRightTime(): boolean {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const today = now.getDate();
        const hours = 12;
        const minues = 20;
        const end = new Date(year, month, today, hours, minues);
        const start = new Date(year, month, today, 10);
        return now >= start && now < end;
    }

    public hasOrder(chatId: number){
        return this.orders.some(order => order.chatId === chatId);
    }

    public toggleOpen(): boolean {
        this._isOpen = !this._isOpen;
        return this._isOpen;
    }

    /** cancel order */
    public cancel(id: number) {
        this.orders = this.orders.filter(order => order.chatId !== id);
    }
    public cancelAll() {
        this.orders = [];
    }
}
