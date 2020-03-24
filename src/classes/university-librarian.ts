import * as Interfaces from '../interfaces';
import { sealed, logger, writebale, logMethod, logParameter, format } from '../decorators';

@logger
@sealed('UniversityLibrarian')
export class UniversityLibrarian implements Interfaces.Librarian{
    @format()
    name: string;
    email: string;
    department: string;

    @logMethod
    assistustomers(@logParameter custName: string): void{
        console.log(`${this.name} is assisting ${custName}`)
    }

    @writebale(true)
    assistFaculty(){
        console.log('Assisting faculty');
    }

    @writebale(false)
    techCommunity(){
        console.log('Teching community');
    }
}
