const support = require('./support');
const fs = require('fs');
const fileList = require('./glob')
.then((list) => {
    removeAnnotationFunc(list);
});

const errMsg = "can't find the js file inside the project.";
let errorList = [];

function removeAnnotationFunc(pathList) {
    pathList.forEach(file => {
        fileRead(file).then((tmp) => {
            //contentToArray
            const content = support.toArray(support.removeComment(tmp));
            
            //check Korean
            let errIdx = support.booleanArr(content.length);
            let errFlag = false;
            content.forEach((item, idx) => {
                if(support.checkLiteral(item)) {
                    if(idx-1>=0) errIdx[idx-1] = true;
                    if(idx+1<content.length) errIdx[idx+1]  = true;
                    errIdx[idx] = true;
                    errFlag = true;
                }
            });
            //createErrorList
            errFlag ? errorList.push(...support.createErrorList(file, content, errIdx)) : '';
        })
    });
}


function fileRead(file) {
    return new Promise( (resolve, reject)=> {
        fs.readFile(file, 'utf-8', (err, tmp) => {
            tmp ? resolve(tmp) : reject(new Error(errMsg));
        });
    });
}
 
module.exports = new Promise( (resolve, reject) => {
    setTimeout(() => {
        typeof errorList !== 'undefined' ? resolve(errorList) : reject;
    },100);
});