const { app } = require('electron')

const update = require('./core/update')
const window = require('./core/window')

app.on('window-all-closed', app.exit)
app.on('ready', async function () {
    var uWin = await update.windowOpen()

    if ( await update.check() )
        return update.start()

    else window.open('main', {
        kiosk: true
    }).then(window => {
        uWin.close()
    })
})