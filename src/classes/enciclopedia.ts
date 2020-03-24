import {ReferenceItem} from "./reference-item";
import { positiveInteger } from "../decorators";

export default class Encyclopedia extends ReferenceItem{
    private _copies: number;

    constructor(title, year, public edition: number){
        super(title, year);
    }

    printItems(): void{
        super.printItems();
        console.log(`edition: ${this.edition} (${this.year})`)

    }

    printCitation(): void{
        console.log(`${this.title} - ${this.year}`)
    }

    get copies():number {
        return this._copies;
    }

    @positiveInteger
    set copies(value: number) {
        this._copies = value;
    }
}
