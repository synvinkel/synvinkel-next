import React from 'react'

import { Style } from '../components/Layout'
import Header from '../components/Header'
import MyHead from '../components/MyHead'


function mdxPost(frontMatter) {
    // return withLayout(
    return ({ children }) => {

        const slug = frontMatter.__resourcePath
            .replace('notes/', '')
            .replace('.mdx', '')

        return (
            <>
                <MyHead title={frontMatter.title} />
                <Header />
                <main>
                    <article>
                        <h1>{frontMatter.title}</h1>
                        {children}
                    </article>
                </main>
                <Style />
            </>
        )
    }
    // )
}

export default mdxPost