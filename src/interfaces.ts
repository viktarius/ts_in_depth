import {Category} from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void
    markDamaged?: Logger
}

interface Logger {
    (reason: string): void
}

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

export {Book, Logger, Person, Author, Librarian};