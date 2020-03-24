namespace Utility{
    export namespace Fees{
        export function calculateLateFee(daysLate: number): number{
            return daysLate * 0.25;
        }
    }

    export function maxBooksAllawed(age: number): number {
        return age < 12 ? 3 : 10;
    }

    function privateFunction(): void {
        console.log('This is private');
    }
}
