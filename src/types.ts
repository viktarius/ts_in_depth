import { Book, Person } from "./interfaces";

type BookProperties = keyof Book;

type PersonBook = Person & Book;

type BookOrUndefiend = Book | undefined;

export {BookProperties, PersonBook, BookOrUndefiend}