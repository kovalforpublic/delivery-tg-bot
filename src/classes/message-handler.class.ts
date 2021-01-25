import TelegramBot, { KeyboardButton, Message, ParseMode, ReplyKeyboardMarkup, ReplyKeyboardRemove, SendBasicOptions } from "node-telegram-bot-api";
import { ShavermaSize } from "src/states";
import { Customer } from "./customer.class";
import { Shaverma } from "./shaverma.class";
import { ShavermaShop } from "./shaverma-shop.class";

import * as fs from 'fs';

export class MessageHandler {
    protected readonly shop: ShavermaShop = new ShavermaShop();
    constructor(protected readonly bot: TelegramBot) {}

    public onCompleted = ({chat: {username}}: Message, match: RegExpExecArray) => {
        const adminMessage = match[1] ? match[1] : "в кабинете 6.22";
        if (this.shop.isAdmin(username)) {
            this.notifyAllOnDelivery(adminMessage);
        }
    }
    public onMakeOrder = ({chat: {id}}: Message) => {
        if (!this.shop.isRightTime() || !this.shop.isOpen) {
            this.bot.sendMessage(id, "В данное время заказы не принимаются");
            return;
        }
        if (!this.shop.hasOrder(id)) {
            this.chooseType(id);
        } else {
            this.handleSecondOrder(id);
        }
    }
    public onMessage = ({chat: {id, username}, text}: Message) => {
        if (this.shop.isLabel(text) && !this.shop.hasOrder(id)) {
            const shaverma = this.shop.getNew(text);
            shaverma.customer = new Customer(id, username);
            this.shop.add(shaverma);
            this.chooseSize(id);
            return;
        }
    
        if (this.shop.isSizeLabel(text)) {
            const shaverma = this.shop.get(id);
            const size: ShavermaSize = this.shop.getSize(text);
            shaverma.setSize(size);
            const { caption, price } = shaverma;
    
            this.notifyClient(id, caption, text);
            setTimeout(() => {
                this.sendPriceInfo(id, price);
            }, 200);
            this.notifyAdmin(shaverma, text);
        }
        if (text === 'отменить') {
            this.cancelOrder(id)
        }
        if (text === 'оставить') {
            this.notifyOrderSaved(id);
        }
    }

    public sendInfo = ({chat: {id}}: Message) => {
        this.bot.sendMessage(id, info);
    }
    public onGetImage = ({chat: {id}}: Message) => {
        fs.readFile("image.jpg", (err, data) => {
            if (err) {
                this.bot.sendMessage(id, "что-то пошло не так...");
            } else {
                this.bot.sendPhoto(id, data);
            }
        });
    }
    public cancelOrder(chatId: number) {
        const found: Shaverma | null = this.shop.get(chatId);
        if (!found) {
            this.bot.sendMessage(chatId, 'У вас нет заказов');
            return;
        }
        const {caption, username, size} = found;
        const sizeCaption = this.shop.getSizeCaption(size);
        this.shop.cancel(chatId);

        this.bot.sendMessage(chatId, 'Заказ успешно отменён', {...keyboardOff});
        this.bot.sendMessage(chatId, `Отменён заказ для ${username}, детали: ${caption} ${sizeCaption}`);
    }
    public getStatus = ({chat: {id}}: Message) => {
        const order = this.shop.get(id);
        if (!order) {
            this.bot.sendMessage(id, 'У вас нет заказов');
        } else {
            const { caption, size } = order;
            const sizeCaption = this.shop.getSizeCaption(size);
            this.bot.sendMessage(id, `Вы заказали ${caption}, ${sizeCaption}`);
        }
    }
    public getShopStatus = ({chat: {id}}: Message) => {
        const status = this.shop.isOpen();
        if (status) {
            this.bot.sendMessage(id, 'Сегодня доставка работает!');
        } else {
            this.bot.sendMessage(id, 'Сегодня доставка `не` работает(', {...markdown})
        }
    }
    public onToggleShopState = ({chat:{id, username}}: Message) => {
        if (this.shop.isAdmin(username)) {
            const status = this.shop.toggleOpen();
            this.bot.sendMessage(id, `status is ${status}`);
        } else {
            this.bot.sendMessage(id, `You're not authorized for this operation`);
        }
    }

    protected notifyAllOnDelivery(text: string) {
        const orders = this.shop.getAll();
        orders.map(order => {
            const { size } = order;
            
            const sizeCaption = this.shop.getSizeCaption(size);
            this.bot.sendMessage(order.chatId, `${order.caption} ${sizeCaption} 🌯 - можно забрать ${text}`)
        })
    
        setTimeout(() => {
            this.shop.cancelAll();
        }, 5000);
    }
    protected chooseType(id: number) {
        this.bot.sendMessage(id, "Выберите шаверму", {...choices});
    }
    protected handleSecondOrder(chatId: number) {
        const { caption, size } = this.shop.get(chatId);

        const sizeCaption = this.shop.getSizeCaption(size);
        this.bot.sendMessage(
            chatId,
            `Вы уже сделали заказ! ${caption} 🌯, ${sizeCaption}. Отменить предыдущий заказ?`, {
            reply_markup: {keyboard: [[{text: "отменить"}, {text: "оставить"}]]}
        });
    }
    protected chooseSize(id: number) {
        const shaverma = this.shop.get(id);
        const [wxs, wm, wxl] = shaverma.weights;
        const [pxs, pm, pxl] = shaverma.prices;
        const text = `
Выберите размер. 
XS - ${wxs}г, ${pxs} руб, 
M - ${wm}г, ${pm} руб,
XL - ${wxl}г, ${pxl} руб`;

        this.bot.sendMessage(id, text, {...sizes})
    }
    protected notifyClient(id: number, caption: string, text: string) {
        this.bot.sendMessage(
            id, 
            `Ваша ${caption} 🌯 , ${text}, успешно добавлена! Ожидаемое время доставки \`13:10\`-\`13:20\``, 
            {...markdown}
        );
    }
    protected notifyAdmin({caption, price, username}: Shaverma, sizeCaption: string) {
        this.bot.sendMessage(
            this.shop.getAdminId(), 
            `Новый заказ! ${caption}, ${sizeCaption}, ${price} руб, для ${username}`
        );
    }
    protected sendPriceInfo(id: number, price: number) {
        this.bot.sendMessage(id, `С вас \`${price} \` руб, перевод через сбп \`7 950 039 60 55\`, альфабанк`, {
            ...keyboardOff,
            ...markdown
        });
    }
    protected notifyOrderSaved(chatId: number) {
        this.bot.sendMessage(chatId, "Заказ в силе. Ожидаемое время доставки \`13.10\`-\`13.20\`", {
            ...keyboardOff,
            ...markdown
        })
    }
}

const sizeButtons: KeyboardButton[][] = [
    [{text: 'XS (маленькая)'}],
    [{text: 'M (средняя)'}],
    [{text: 'XL (большая)'}]
];
const choiceButtons: KeyboardButton[][] = [
    [{text: "Классическая"}, {text:"Сырная"}],
    [{text: "Грибная"}, {text: "Мексиканская"}],
    [{text: "Мясо-микс"}, {text: "Греческая"}],
    // ["Фалафель"],
]

const markdown: {parse_mode: ParseMode} = {parse_mode: 'Markdown'}
const keyboardOff: {reply_markup: ReplyKeyboardRemove} = {
    reply_markup: {
        remove_keyboard: true
    }
}
const choices: TBotReply = {
    reply_markup: {
        keyboard: choiceButtons
    }
}
const sizes: TBotReply = {
    reply_markup: {
        keyboard: sizeButtons
    }
}
type TBotReply = {reply_markup: {keyboard: KeyboardButton[][]}};

const info = `
/make_order - сделать заказ

/is_open - работает ли сегодня доставка

/get - получить ассортимент

/status - текущий заказ

/cancel - отменить заказ
`;
