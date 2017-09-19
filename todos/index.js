const electron = require('electron');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL("file://"+__dirname+"/main.html");
    
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
})

function createAddWindow()
{
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title:'Ma fenêtre'
    });
    addWindow.loadURL("file://"+__dirname+"/add.html");
}

const menuTemplate = [
    {
        label: 'File',
        submenu: [{
            label:'Nouveau Todo',
            click() {createAddWindow();}
        },{
            label:'Quitter',
            accelerator: (()=>{
                if(process.platform === 'win32')
                {
                    return 'CommandOrControl+Q';
                }
                else
                {
                    return 'Command+Q';
                }
            })(),
            click(){
                app.quit();
            }
        },{
            role:'paste'
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