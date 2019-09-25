const path = require('path')

const pages = {}
const loads = ['update', 'main']
const root = __dirname

for (let page of loads)
	pages[page] = {
		entry: path.join(root, 'source', `${page}.js`),
        template: path.join(root, 'public', `${page}.html`),
        filename: `${page}.html`
	}

module.exports = {
    publicPath: './',
    pages: pages,
    filenameHashing: false,
    productionSourceMap: false,
    outputDir: path.join(root, 'gui'),
    configureWebpack: {
        resolve: {
            alias: {
                'root': root,
                ':root': root,

                'src': path.join(root, 'source'),
                ':src': path.join(root, 'source')
            }
        }
    }
}