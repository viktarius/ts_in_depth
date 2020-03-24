/// <reference path="utility-functions.ts" />

const r = Utility.Fees.calculateLateFee(20);
console.log(r);

import util = Utility.Fees;

const sd = util.calculateLateFee(10);
console.log(sd);