module.exports = {
    exportPathMap: function () {
        const pages = require('./walkpages')('pages')

        const paths = {}

        pages.forEach(page => {
            paths[page] = { page }
        })

        return paths
    }
}