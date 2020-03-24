import {Category} from './enums';
import {Book, Logger, Person, Author, Librarian, Magazine} from './interfaces';
import {BookProperties, PersonBook, BookOrUndefiend, BookRequiredFields, UpdatedBook, СreateCustomerFunctionType} from './types';
import {getBookById, getBookTitlesByCategory, createCustomerID, getTitles, bookTitleTransform, getAllBooks, printBook, getBookProp, purge, createCustomer } from './functions';
import {RefBook, UniversityLibrarian, Shelf} from './classes';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const el = document.getElementById(divName);
    el.innerText = `Hello from ${name}`;
}

// TASK 02.01
// logFirstAvailable(getAllBooks());
// logBooksTitle(getBookTitlesByCategory(Category.JavaScript));
// console.log(getBookAuthorByIndex(1));
// console.log(calcTotalPages());

// TASK 03.01
// const titles = getBookTitlesByCategory(Category.JavaScript);
// titles.forEach(title => console.log(title));
// console.log(getBookById(1));

// TASK 03.02
// const myID = createCustomerID('Ann', 10);
// console.log(myID);
// let idGenerator: (name: string, id: number) => string =
//     (name: string, id: number) => `${id} - ${name}`;
// idGenerator = createCustomerID;
// console.log(idGenerator('Maris', 20));

// TASK 03.03
// createCustomer('Anna');
// createCustomer('Mario', 22);
// createCustomer('Adrien', 33, 'NY');
// console.log(getBookTitlesByCategory());
// logFirstAvailable();
// const myBooks = checkoutBooks('I', 1, 2, 4);
// console.log(myBooks);

// // TASK 03.04
// const checkoutBooks1 = getTitles(false);
// console.log(checkoutBooks1);
// const checkoutBooks2 = getTitles(2, false);
// console.log(checkoutBooks2);

// TASK 03.05
// try {
//     console.log(bookTitleTransform((getAllBooks()[0] as any).title));
//     console.log(bookTitleTransform(234));
// } catch (e) {
//     console.log(e);
// }

// TASK 04.01
// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason => {
//         console.log(`Damaged: ${reason}`);
//     })
// };
// printBook(myBook);
// myBook.markDamaged('missing back cover');

// TASK 04.02
// const logDamage: Logger = (reason => console.log(`Damaged: ${reason}`));
// logDamage('missing red color');

// TASK 04.03
// const favoriteAuthor: Author = {
//     name: 'Author Conan Doyle',
//     email: 'AConanDoyle@gmail.com',
//     numBooksPublished: 1000
// }
// const favoriteLabrerian: Librarian = {
//     name: '',
//     email: '',
//     department: '',
//     assistustomers: (custName) => console.log(custName)
// }

// TASK 04.04
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript'
//     }
// }
// console.log(offer?.magazine);

// TASK 04.05
// console.log(getBookProp(getAllBooks()[0], 'title'));
// console.log(getBookProp(getAllBooks()[0], 'markDamaged'));
// console.log(getBookProp(getAllBooks()[0], 'isbn'));

// TASK 05.01
// const ref = new ReferenceItem('myTitle', 2020);
// console.log(ref);
// ref.printItems();
// ref.publisher = 'smth';
// console.log(ref.publisher);

// TASK 05.02
// const refBook = new RefBook('enc: title', 2020, 10);
// console.log(refBook);
// refBook.printItems();
// refBook.publisher = 'abc';
// console.log(refBook.publisher);

// TASK 05.03
// refBook.printCitation();

// TASK 05.04
// const favoriteLabrerian1: Librarian = new UniversityLibrarian();
// console.log(favoriteLabrerian1)
// favoriteLabrerian1.name = "Ann";
// favoriteLabrerian1.assistustomers("Bob");

// TASK 05.05
// const personBook: PersonBook = {
//     name: 'Anna',
//     email: 'anna@gmail.com',

//     id: 5,
//     title: 'My Title',
//     available: true,
//     category: Category.CSS,
//     author: 'Anton Pelex'
// } 
// console.log(personBook);

// TASK 06.05
// import('./classes')
//     .then( module => {
//         const reader = new module.Reader();
//         console.log(reader);
//         reader.name = 'Anna';
//         reader.take(getAllBooks()[1]);
//     })

// TASK 07.01
// const inventory = [
//     { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
//     ]; 
    
// const resultInventory = purge(inventory);
// console.log(resultInventory);
// const resultNumber = purge([1,2,3,4,5,6]);
// console.log(resultNumber);

// TASK 07.02
// const bookShelf = new Shelf<Book>();
// inventory.forEach(item => bookShelf.add(item));
// console.log(bookShelf.getFirst().title)

// const magazine = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' }
// ];
// const magazineShelf = new Shelf<Magazine>();
// magazine.forEach(item => magazineShelf.add(item));
// console.log(magazineShelf.getFirst())

// TASK 07.03
// magazineShelf.printTitles();
// console.log(magazineShelf.find('Five Points'));

// TASK 07.04
// const book: BookRequiredFields = {
//     id: 1,
//     title: 'title',
//     author: 'Dohn Doe',
//     available: true,
//     category: Category.Software,
//     pages: 222,
//     markDamaged: null
// }
// console.log(book);
// const updatedBook: UpdatedBook = {
//     id: 23,
//     title: 'ez way'
// }
// updatedBook.category = Category.JavaScript;
// console.log(updatedBook);
// const params: Parameters<СreateCustomerFunctionType> = ['Anna'];
// createCustomer(...params);

// TASK 08.01
const l  = new UniversityLibrarian();
l.name = "Bob";
l['printLabrarian']();
