showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const el = document.getElementById(divName);
    el.innerText = `Hello from ${name}`;
}

// TASK 02.01
enum Category { JavaScript, CSS, HTML, TypeScript, Angular }

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

// logFirstAvailable(getAllBooks());
// logBooksTitle(getBookTitlesByCategory(Category.JavaScript));
// console.log(getBookAuthorByIndex(1));
// console.log(calcTotalPages());

// TASK 03.01
function getBookById(id: number): BookOrUndefiend {
    const books = getAllBooks();
    return books.find(book => book['id'] === id)
}

const titles = getBookTitlesByCategory(Category.JavaScript);
titles.forEach(title => console.log(title));
console.log(getBookById(1));

// TASK 03.02
function createCustomerID(name: string, id: number) {
    return `${id} - ${name}`;
}

const myID = createCustomerID('Ann', 10);
console.log(myID);
let idGenerator: (name: string, id: number) => string =
    (name: string, id: number) => `${id} - ${name}`;
idGenerator = createCustomerID;
console.log(idGenerator('Maris', 20));

// TASK 03.03
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

// createCustomer('Anna');
// createCustomer('Mario', 22);
// createCustomer('Adrien', 33, 'NY');
// console.log(getBookTitlesByCategory());
// logFirstAvailable();
// const myBooks = checkoutBooks('I', 1, 2, 4);
// console.log(myBooks);

// TASK 03.04
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

const checkoutBooks1 = getTitles(false);
console.log(checkoutBooks1);
const checkoutBooks2 = getTitles(2, false);
console.log(checkoutBooks2);

// TASK 03.05
function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return title.split('').reverse().join('');
}

try {
    console.log(bookTitleTransform((getAllBooks()[0] as any).title));
    console.log(bookTitleTransform(234));
} catch (e) {
    console.log(e);
}

// TASK 04.01
interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void
    markDamaged?: DamageLogger
}

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`)
}

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason => {
        console.log(`Damaged: ${reason}`);
    })
};

printBook(myBook);
myBook.markDamaged('missing back cover');

// TASK 04.02
interface DamageLogger {
    (reason: string): void
}

const logDamage: DamageLogger = (reason => console.log(`Damaged: ${reason}`));
logDamage('missing red color');

// TASK 04.03
interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistustomers: (custName: string) => void
}

const favoriteAuthor: Author = {
    name: 'Author Conan Doyle',
    email: 'AConanDoyle@gmail.com',
    numBooksPublished: 1000
}

const favoriteLabrerian: Librarian = {
    name: '',
    email: '',
    department: '',
    assistustomers: (custName) => console.log(custName)
}

// TASK 04.04
const offer: any = {
    book: {
        title: 'Essential TypeScript'
    }
}

console.log(offer?.magazine);

// TASK 04.05
type BookProperties = keyof Book;
function getBookProp(book: Book, prop: BookProperties) {
    if(typeof book[prop] === 'function'){
        return (book[prop] as Function).name;
    }
    return book[prop];
}

console.log(getBookProp(getAllBooks()[0], 'title'));
console.log(getBookProp(getAllBooks()[0], 'markDamaged'));
// console.log(getBookProp(getAllBooks()[0], 'isbn'));

// TASK 05.01
abstract class ReferenceItem {
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

// const ref = new ReferenceItem('myTitle', 2020);
// console.log(ref);
// ref.printItems();
// ref.publisher = 'smth';
// console.log(ref.publisher);

// TASK 05.02
class Encyclopedia extends ReferenceItem{
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

const refBook = new Encyclopedia('enc: title', 2020, 10);
console.log(refBook);
refBook.printItems();
refBook.publisher = 'abc';
console.log(refBook.publisher);

// TASK 05.03
refBook.printCitation();

// TASK 05.04
class UniversityLibrarian implements Librarian{
    name: string;
    email: string;
    department: string;

    assistustomers(custName: string): void{
        console.log(`${this.name} is assisting ${custName}`)
    }
}

const favoriteLabrerian1: Librarian = new UniversityLibrarian();
console.log(favoriteLabrerian1)
favoriteLabrerian1.name = "Ann";
favoriteLabrerian1.assistustomers("Bob");

// TASK 05.05

type PersonBook = Person & Book;
const personBook: PersonBook = {
    name: 'Anna',
    email: 'anna@gmail.com',

    id: 5,
    title: 'My Title',
    available: true,
    category: Category.CSS,
    author: 'Anton Pelex'
} 
console.log(personBook);

type BookOrUndefiend = Book | undefined;
