const path = require('path')
const { BrowserWindow } = require('electron')
const config = require('../config')

const list = {}
const defaults = {
    icon: path.join(config.dir.gui, 'icon.ico'),
    show: false,
    frame: false,
    webPreferences: {
        nodeIntegration: false,
        preload: path.join(config.dir.gui, 'script/ipc.js'),
        webSecurity: true
    }
}

module.exports = { exists, custom, open, load }

function exists (window) {
    return list[window] instanceof BrowserWindow
}

function custom (name, options) {
    return new Promise((resolve, reject) => {
        if ( this.exists(name) === true )
            return reject(`window ${name} already exists`)

        else {
            list[name] = new BrowserWindow(options)
            return resolve(list[name])
        }
    })
}

function open (name, extra = {}) {
    var options = extraOptions(defaults, extra)

    return new Promise((resolve, reject) => {
        this.custom(name, options)
            .then(handle)
            .catch(reject)

        function handle (window) {
            window.loadFile( path.join(config.dir.gui, `${name}.html`) )
            window.once('ready-to-show', () => {
                window.show()
                resolve(window)
            })
        }
    })
}

function load (window) {
    return new Promise((resolve, reject) => {
        if ( this.exists(window) === true )
            return resolve(list[window])

        else return reject(`window ${name} not exists`)
    })
}

// Helper functions
function extraOptions (...options) {
    var copy = {}

    options.forEach(obj => {
        Object.assign(copy, JSON.parse(JSON.stringify(obj)))
    })

    return copy
}