const withCSS = require('@zeit/next-css')

module.exports = withCSS(
    {
        exportPathMap: function () {
            const pages = require('./walkpages')('next/pages')

            const paths = {}

            pages.forEach(page => {
                paths[page] = { page }
            })

            return paths
        }
    }
)