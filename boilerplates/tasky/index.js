const electron = require('electron');
const path = require('path');
const {app, BrowserWindow, Tray} = electron;
const TimerTray = require('./app/timer_tray');


let mainWindow;
let tray;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height:500,
        width:300,
        frame:false,
        resizable:false,
        show:false
    });
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    //on n'utilise pas cette référence, mais si on ne la met pas,
    //notre TimerTray sera garbage collected tôt ou tard
    tray = new TimerTray(iconPath, mainWindow);


});