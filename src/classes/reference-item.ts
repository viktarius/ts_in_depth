export abstract class ReferenceItem {
    // title: string;
    // year: number;
    private _publisher: string;

    // constructor(newTitle: string, newYear: number){
        // console.log('Creating a new ReferenceItem...');
        // this.title = newTitle;
        // this.year = newYear;
    // }

    constructor(public title: string, protected year: number ){}

    printItems(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    get publisher(): string{
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    abstract printCitation(): void;

    static department: string = "Classical";
}
