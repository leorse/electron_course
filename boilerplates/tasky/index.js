const electron = require('electron');
const path = require('path');
const {app, ipcMain} = electron;
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/mainwindow');


let mainWindow;
let tray;

app.on('ready', () => {
    //uniqmenet sur OS
    //app.dock.hide();
    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    //on n'utilise pas cette référence, mais si on ne la met pas,
    //notre TimerTray sera garbage collected tôt ou tard
    tray = new TimerTray(iconPath, mainWindow);


});

ipcMain.on("update-timer", (event, timeleft) =>
{
    tray.setTitle(timeleft);
});