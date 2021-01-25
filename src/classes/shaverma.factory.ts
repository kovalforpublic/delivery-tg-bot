import { Shaverma } from "./shaverma.class";
import { 
    ShavermaCheese, 
    ShavermaClassic, 
    ShavermaFalafel, 
    ShavermaGreek, 
    ShavermaMeatmix, 
    ShavermaMexican, 
    ShavermaMushroom,
    TShavermaState 
} from "../states";
import { ShavermaType } from "./shaverma-type.enum";

const { CLASSIC, CHEESE, MEAT_MIX, MEXICAN, GREEK, MUSHROOM, VEGGIE, FALAFEL } = ShavermaType;
export class ShavermaFactory {
    public getInstance(type: ShavermaType): Shaverma {
        const state = this.getState(type);
        return new Shaverma(state);
    }

    protected getState(type: ShavermaType): TShavermaState {
        switch(type) {
            case CLASSIC:
                return new ShavermaClassic();
            case CHEESE:
                return new ShavermaCheese();
            case MEAT_MIX:
                return new ShavermaMeatmix();
            case MEXICAN:
                return new ShavermaMexican();
            case GREEK:
                return new ShavermaGreek();
            case MUSHROOM:
                return new ShavermaMushroom();
            case FALAFEL:
                return new ShavermaFalafel();
        }
    }
}
