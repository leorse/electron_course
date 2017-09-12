const electron = require('electron');

const {pouet} = electron;

pouet.on('ready', ()=> {
    console.log('Hello world!!');
});