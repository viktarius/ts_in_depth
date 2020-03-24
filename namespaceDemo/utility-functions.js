var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function calculateLateFee(daysLate) {
            return daysLate * 0.25;
        }
        Fees.calculateLateFee = calculateLateFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function maxBooksAllawed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.maxBooksAllawed = maxBooksAllawed;
    function privateFunction() {
        console.log('This is private');
    }
})(Utility || (Utility = {}));
