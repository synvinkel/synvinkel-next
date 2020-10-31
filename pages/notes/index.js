import { frontMatter as notes } from './*.mdx'
import withLayout from '../../components/Layout'
import Header from '../../components/Header'

const Notes = () => (
    <>
        <Header />

        <main>
            <article>

                {notes.map((frontMatter) => {
                    const slug = frontMatter.__resourcePath
                        .replace('.mdx', '')
                    console.log(frontMatter)
                    return (
                        // <BlogPost key={frontMatter.title} {...frontMatter} />
                        <div key={frontMatter.title}>
                            <a href={slug}>{frontMatter.title}</a>
                            {/* {frontMatter} */}
                        </div>

                    )
                }
                )}
            </article>
        </main>
    </>
)

export default withLayout(Notes, 'Notes')