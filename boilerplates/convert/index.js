const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const {app, BrowserWindow, ipcMain} = electron;
const _ = require('lodash');

let mainWindow;

app.on('ready', () =>
{
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on("videos:added", (event, videos) =>
{
    /*const promise = new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videos[0].path, (err, metadata)=>
        {
            resolve(metadata);
        });
    });

    promise.then((metadata)=>{console.log(metadata);});
*/
    const promises = _.map(videos, video=>{
        return new Promise((resolve, reject)=>{
            ffmpeg.ffprobe(video.path, (err, metadata)=> {
                console.log(`fichier ${video.name} terminé`);
                video.duration = metadata.format.duration;
                video.format = 'avi';
                resolve(video);
            });
        });
    });


    Promise.all(promises)
    .then((results)=>{
        mainWindow.webContents.send('metadata:complete', results);
    });
});

ipcMain.on("conversion:start", (event, videos)=>{
    _.each(videos, video=>{
    const outputDirectory = video.path.split(video.name)[0];
    const outputName = video.name.split('.')[0];
    const outFile = `${outputDirectory}${outputName}.${video.format}`;
    console.log(outFile);
    ffmpeg(video.path)
    .output(outFile)
    .on("progress", ({timemark})=>{
        mainWindow.webContents.send("conversion:progress", {video, timemark})
    })
    .on("end", ()=>mainWindow.webContents.send("conversion:end", 
        {video:video,
            outputPath:outFile
        }))
    .run();
    });
});