const { ipcMain } = require('electron')
const window = require('./window')
module.exports = { async, sync, send }

function async (channel, callback) {
    ipcMain.on(channel, async function (event, ...data) {
        var result = callback(...data)
        var answer = await response(result)

        event.reply(channel, answer)
    })
}

function sync (channel, callback) {
    ipcMain.on(channel, async function (event, ...data) {
        var result = callback(...data)
        event.returnValue = await response(result)
    })
}

async function send (channel, wName, data) {
    var win = await window.load(wName)
    win.webContents.send(channel, data)
}

async function response (result) {
    if ( result === undefined || result.then === undefined )
        return result
    else return await result
}