export function sealed(param: string){
    return function(target: Function): void{
        console.warn(`Sealing the constructor ${param}`);
        Object.seal(target);
        Object.seal(target.prototype);
    }
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newContructor: Function = function() {
        console.log('creating new instance');

        this.age = 30;
    }

    newContructor.prototype = Object.create(target.prototype);
    newContructor.prototype.constructor = newContructor;

    newContructor.prototype.printLabrarian = function() {
        console.log(`Labrarian name: ${this.name}, Labrarian age: ${this.age}`)
    }

    return newContructor as TFunction;
}
