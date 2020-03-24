import { Category } from "./enums";
import { Book, LibMgrCallback } from "./interfaces";
import { BookOrUndefiend, BookProperties } from "./types";

function getAllBooks(): Book[] {
    return [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript
        }
    ]
}

function logFirstAvailable(books: Book[] = getAllBooks()): void {
    let firstAvailableBookTitle: string = '';

    for (const book of books) {
        if (book.available) {
            firstAvailableBookTitle = book.title;
            break;
        }
    }

    console.log(`Total books: ${books.length}`);
    console.log(`Title first available book: ${firstAvailableBookTitle}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    const resultBooks: string[] = [];

    for (const book of books) {
        if (category === book['category']) {
            resultBooks.push(book['title'])
        }
    }

    return resultBooks;
}

function logBooksTitle(booksTitle: string[]): void {
    booksTitle.forEach(bookTitle => console.log(bookTitle));
}

function getBookAuthorByIndex(index: number): [string, string] {
    const book = getAllBooks()[index];
    return [book['title'], book['author']]
}

function getBookById(id: number): BookOrUndefiend {
    const books = getAllBooks();
    return books.find(book => book['id'] === id)
}

function createCustomerID(name: string, id: number) {
    return `${id} - ${name}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log('customer name: ', name);
    if (age) {
        console.log('customer age: ', age);
    }
    if (city) {
        console.log('customer city: ', city);
    }
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log('checking out books for ', customer);

    const titles: string[] = [];
    for (const id of bookIDs) {
        const book = getBookById(id);
        if (book && book['available']) {
            titles.push(book['title']);
        }
    }
    return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: [number | string | boolean, boolean?]): string[] {
    const books = getAllBooks();

    if (args.length < 1 || args.length > 2) {
        return []
    }

    if (args.length === 1) {
        const arg = args[0];
        if (typeof arg === 'string') {
            return books
                .filter((book: any) => book.author === arg)
                .map((book: any) => book.title)
        }
        if (typeof arg === 'boolean') {
            return books
                .filter((book: any) => book.available)
                .map((book: any) => book.title);
        }
    }

    if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            return books
                .filter((book: any) => book.available === available && book.id === id)
                .map((book: any) => book.title);
        }
    }
}

function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return title.split('').reverse().join('');
}

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`)
}

function getBookProp(book: Book, prop: BookProperties) {
    if(typeof book[prop] === 'function'){
        return (book[prop] as Function).name;
    }
    return book[prop];
}

// function calcTotalPages(): bigint {
//     const data = [
//         {lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250},
//         {lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300},
//         {lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280}
//     ];

//     return data.reduce((acc: bigint, obj) =>
//         acc + BigInt(obj.avgPagesPerBook) * BigInt(obj.books)
//         , 0n);
// }

export function purge<T>(inventary: Array<T>): Array<T> {
    return inventary.slice(2);
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise<string[]>( (resolve, reject) => {
        setTimeout(() => {
            const titles: string[] = getBookTitlesByCategory(category);

            if(titles.length > 0){
                resolve(titles);
            }else{
                reject('No books found');
            }
        }, 2000);
    })
}

export function logCategorySearch(err: Error, titles: string[]){
    if(err){
        console.log(`Error message: ${err.message}`);
    }else{
        console.log(titles);
    }
}

export async function logSearchResults(category: Category): Promise<any>{
    const numberOfBook = await getBooksByCategoryPromise(category)
    console.log(numberOfBook.length);
} 

export {
    getAllBooks, 
    getBookById,
    logFirstAvailable, 
    getBookTitlesByCategory, 
    logBooksTitle, 
    createCustomerID, 
    createCustomer,
    checkoutBooks,
    getTitles,
    bookTitleTransform,
    printBook,
    getBookProp,
};
