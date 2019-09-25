const { ipcRenderer } = require('electron')
window.ipc = { on, once, sync, async }

function on (name, callback) {
    return ipcRenderer.on(name, callback)
}

function once (name, callback) {
    return ipcRenderer.on(name, callback)
}

function sync (name, ...data) {
    return ipcRenderer.sendSync(name, ...data)
}

function async (name, ...data) {
    return new Promise(resolve => {
        var listener = ipcRenderer.once(`${name}-response`, data => {
            ipcRenderer.removeListener(`${name}-response`, listener)
            return resolve(data)
        })

        return ipcRenderer.send(name, ...data)
    })
}