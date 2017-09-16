const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const {app, BrowserWindow, ipcMain} = electron;

//déclaration de mainWindow ici pour des histoires de scope
let mainWindow;

app.on('ready', ()=> {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, data) => {
    ffmpeg.ffprobe(data, (err, metadata)=>{
        mainWindow.webContents.send('video:response', metadata.format.duration);
        console.log("oui c'est bon: "+metadata.format.duration);
    })
})