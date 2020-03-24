import {ReferenceItem} from "./reference-item";

export default class Encyclopedia extends ReferenceItem{
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
}
