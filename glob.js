const glob = require('glob');

const path = 'src/main/webapp/resources';
const preview = 'src/main/webapp/preview/**';
const errorMsg = "can't find the js file inside the project.";

const ignore = [
    path + '/js/language/**', 
    path + '/release/**',
    path + '/config/**',
    path + '/css/**',
    path + '/download/**',
    path + '/admin/*.js',
    path + '/js/admin/common.js',
    path + '/js/ja/**',
    path + '/js/util/**',
    preview
];

// src/main/webapp/**/*.js
module.exports = new Promise( (resolve, reject) => {
    glob('src/main/webapp/**/*.js', {ignore}, (err, files) => {
        files ? resolve(files) : reject(new Error(errorMsg));
    });
});
    

