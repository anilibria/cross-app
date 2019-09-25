const { app } = require('electron')

app.on('ready', function () {
    console.log('App ready!')
    console.log('Exit...')
    
    return app.exit()
})