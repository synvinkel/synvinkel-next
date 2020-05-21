const withCSS = require('@zeit/next-css')
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

module.exports = (
    withMDX(
        withCSS(
            {
                // exportPathMap: function () {
                //     const pages = require('./walkpages')('pages')

                //     const paths = {}

                //     pages.forEach(page => {
                //         paths[page] = { page }
                //     })

                //     return paths
                // },
                pageExtensions: ['js', 'jsx', 'mdx'],
            }
        )
    )
)