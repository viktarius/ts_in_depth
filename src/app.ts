showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const el = document.getElementById(divName);
    el.innerText = `Hello from ${name}`;
}

enum Category { JavaScript, CSS, HTML, TypeScript, Angular }

function getAllBooks(): object[] {
    return [
        {title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
        {title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript},
        {title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
        {
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript
        }
    ]
}

function logFirstAvailable(books: any[]): void {
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

function getBookTitlesByCategory(category: Category): string[] {
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

// TASK 01.02
logFirstAvailable(getAllBooks());
logBooksTitle(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(1));
console.log(calcTotalPages());
