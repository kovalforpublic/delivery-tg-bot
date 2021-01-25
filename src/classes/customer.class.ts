export class Customer {
    // protected chat_id: number;
    // protected username: string;

    public get name(): string {
        return this.username;
    }
    public get chatId(): number {
        return this.chat_id;
    }
    public set name(name: string) {
        this.username = name;
    }
    public set chatId(id: number) {
        this.chat_id = id;
    }
    constructor(protected chat_id: number, protected username: string) {}
}