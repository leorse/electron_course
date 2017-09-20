const electron = require('electron');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;
process.env.NODE_ENV = 1;
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL("file://"+__dirname+"/main.html");
    mainWindow.on('closed', ()=>app.quit());
    
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
            label:'A propos'
        }
    ]
    }
];

if(process.platform === 'darwin')
{
    //insère un élément vide en début du tableau menuTemplate
    menuTemplate.unshift({});
}

if(process.env.NODE_ENV)
{
    menuTemplate.push({
        label: 'DEV',
        submenu: [{
            label:'Dev tools',
            accelerator:'CommandOrControl+Shift+I',
            click(item, focused){
                focused.webContents.openDevTools();
            }
        },{
            role:'reload'
        }
    ]
    });
    debugger;
}