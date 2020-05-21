const withCSS = require('@zeit/next-css')
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/,
})

module.exports = (
    withMDX(
        withCSS(
            {
                pageExtensions: ['js', 'jsx', 'mdx', 'md'],
            }
        )
    )
)