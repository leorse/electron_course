const electron = require('electron');
const {Tray, app, Menu} = electron;

class TimerTray extends Tray 
{
    constructor(iconPath, mainWindow) {
        super(iconPath);

        this.mainWindow = mainWindow;
        this.setToolTip('Timer Tray');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
        console.log('creation de mon timertray');
    }

    onRightClick()
    {
        const menuConfig = Menu.buildFromTemplate(
            [
                {
                    label:'Quit',
                    click:()=>app.quit()
                }
            ]
        );
        this.popUpContextMenu(menuConfig);
    }

    onClick()
    {
        const {x, y} = electron.screen.getCursorScreenPoint();
        const {height, width} = this.mainWindow.getBounds();
        
        console.log(x, y);
        if(this.mainWindow.isVisible())
        {
            this.mainWindow.hide();
        }
        else
        {
            this.mainWindow.show();
        }
    }

}



module.exports = TimerTray;