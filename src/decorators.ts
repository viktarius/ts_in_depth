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

export function writebale(isWritable: boolean) {
    return function(target: object, methodName: string, descriptor: PropertyDescriptor){
        console.log(`Method decorator writable with value: ${isWritable}`)
        descriptor.writable = isWritable;

        return descriptor;
    }
} 

export function timeout(ms: number = 0 ) { 
    return function(target: object, methodName: string, descriptor: PropertyDescriptor){
        console.log(`Mehtod decorator timeout with value: ${ms}`);
        const originMethod = descriptor.value;
        descriptor.value = function(...args: any[]){
            setTimeout(() => {
                return originMethod.apply(this, args)
            }, ms);
        }
        return descriptor;
    }

}

export function logParameter(target: any, methodName: string, index: number){
    const key = `${methodName}_decor_params_indexes`;

    if(Array.isArray(target[key])){
        target[key].push(index);
    }else{
        target[key] = [index];
    }
}

export function logMethod(target: object, methodName: string, descriptor: PropertyDescriptor){
    const originMethod = descriptor.value;
    descriptor.value = function(...args: any[]){
        const key = `${methodName}_decor_params_indexes`;
        const indexes = target[key];
        
        if(Array.isArray(indexes)){
            args.forEach((arg, index) => {
                if(indexes.includes(index)){
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            })
        }
        return originMethod.apply(this, args)
    }
    return descriptor;
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
  ) {
    const values = new Map<any, T>();
  
    Object.defineProperty(prototype, propertyName, {
      set(firstValue: any) {
        Object.defineProperty(this, propertyName, {
          get() {
            if (getTransformer) {
              return getTransformer(values.get(this));
            } else {
              values.get(this);
            }
          },
          set(value: any) {
            if (setTransformer) {
              values.set(this, setTransformer(value));
            } else {
              values.set(this, value);
            }
          },
          enumerable: true
        });
        this[propertyName] = firstValue;
      },
      enumerable: true,
      configurable: true
    });
  }
  

export function format(pref: string = 'Mr./Mrs.'){
    return function(target: any, propertyName: string){
        makeProperty(target, propertyName, value => `${pref} ${value} `, value => value)
    }
}

export function positiveInteger(target: any, methodName: string, descriptor: PropertyDescriptor){
    const originSet = descriptor.set;

    descriptor.set = function(value: number){
        if(value < 1 || Number.isInteger(value)){
            throw new Error('Invalid value');
        }

        if(originSet){
            originSet.call(this, value);
        }
    }

    return descriptor;
}
