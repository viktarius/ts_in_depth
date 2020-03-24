import { ShelfItem } from "../interfaces";

export default class Shelf<T extends ShelfItem> {
    private _items: Array<T> = [];

    add(item: T): void{
        this._items.push(item);
    }

    getFirst(): T{
        return this._items[0];
    }

    find(title: string): T{
        return this._items.find(item => item.title === title)
    }

    printTitles(): void{
        const titles = [];
        this._items.forEach(item => titles.push(item.title));
        console.log(titles.join(', '));
    }
}