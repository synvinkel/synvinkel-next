const withCSS = require('@zeit/next-css')
const withMdxEnhanced = require('next-mdx-enhanced')

module.exports = withMdxEnhanced({
    layoutPath: 'layouts',
    defaultLayout: true,
    fileExtensions: ['mdx'],
    remarkPlugins: [],
    rehypePlugins: [],
    extendFrontMatter: {
        process: (mdxContent, frontMatter) => { },
        phase: 'prebuild|loader|both',
    },
})(
    /* your normal nextjs config */
    withCSS(
        {
            pageExtensions: ['js', 'jsx', 'mdx', 'md'],
        }
    )
)