const electron = require('electron');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL("file://"+__dirname+"/main.html");
    
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
})

const menuTemplate = [
    {
        label: 'File',
        submenu: [{
            label:'Ouvrir'
        },{
            label:'Quitter',
            click(){
                app.quit();
            }
        }
    ]
    },
    {
        label: 'Aide',
        submenu: [{
            label:'Dev',
            click(){
                mainWindow.webContents.openDevTools();
            }
        },{
            label:'A propos'
        }
    ]
    }
];

if(process.platform === 'darwin')
{
    menuTemplate.unshift({});
}