#! /usr/bin/env node

const list = require('./rule')
.then((errorList) => {
    printData(errorList);
});


function printData(list) {
    list.forEach(item => {
        console.error(item);
    });
}