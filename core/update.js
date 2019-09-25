const { autoUpdater } = require('electron-updater')
const { app } = require('electron')

const Window = require('./window')
const ipc = require('./ipc')

const temp = []
const wName = 'update'

module.exports = { check, start, windowOpen }

function check () {
    ipc.send('set-update-status', wName, 1)

    return new Promise(function (resolve) {
        autoUpdater.autoDownload = false
        autoUpdater.checkForUpdates()
            .then(result => {
                var available = result.updateInfo.version
                resolve(available > app.getVersion())
            })
            .catch(() => {
                setTimeout(async () => {
                    temp[0] = await check()
                    resolve(temp[0])
                }, 10 * 1000)
            })
    })
}

async function start () {
    ipc.send('set-update-status', wName, 2)

    return new Promise(function (resolve) {
        autoUpdater.downloadUpdate()
            .then(result => {
                if( result.length > 0 ) {
                    ipc.send('set-update-status', wName, 3)
                    autoUpdater.quitAndInstall(true, true)
                }
            })
            .catch(() => {
                setTimeout(async () => {
                    temp[1] = await start()
                    resolve(temp[1])
                }, 10 * 1000)
            })
    })
    // app.exit()
}

function windowOpen () {
    return Window.open(wName, {
        height: 320,
        width: 260
    })
}