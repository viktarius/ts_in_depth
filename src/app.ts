showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const el = document.getElementById(divName);
    el.innerText = `Hello from ${name}`;
}

// TASK 02.01
enum Category { JavaScript, CSS, HTML, TypeScript, Angular }

function getAllBooks(): object[] {
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

function logFirstAvailable(books: any[] = getAllBooks()): void {
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

function calcTotalPages(): bigint {
    const data = [
        {lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250},
        {lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300},
        {lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280}
    ];

    return data.reduce((acc: bigint, obj) =>
        acc + BigInt(obj.avgPagesPerBook) * BigInt(obj.books)
        , 0n);
}

// logFirstAvailable(getAllBooks());
// logBooksTitle(getBookTitlesByCategory(Category.JavaScript));
// console.log(getBookAuthorByIndex(1));
// console.log(calcTotalPages());

// TASK 03.01
function getBookById(id: number) {
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

    return [...title].reverse().join('');
}

try{
    console.log(bookTitleTransform((getAllBooks()[0] as any).title));
    console.log(bookTitleTransform(234));
}catch (e) {
    console.log(e);
}
