import withLayout from '../../components/Layout'
import Header from '../../components/Header'

function DigitalGarden() {

    return (
        <>
            <Header />
            <main>
                <article>
                    <h1>Being in the digital garden</h1>

                    <p>
                        <a target="_blank" href="https://joelhooks.com/digital-garden">This blogpost by Joel Hooks</a>, where he talks about his blog as a 'digital garden', puts words to just what
                    I was thinking when I started building this iteration of my personal website. It's not a news feed where I constantly update about everything that I do or think.
                    A post being old doesn't mean it's no longer relevant. It's free form. It's a place where I put things. Things I've made, some experiments, or just noting down a workflow I figured out.
                    </p>
                    <p>
                        It's just as pretentious as it sounds. But it makes sense to me. Just like a regular house garden, it's there for others to visit and enjoy if they want to. But its article purpose is
                        to be there for me to enjoy working in it and tending to it.
                </p>
                </article>
            </main>
        </>

    )
}

export default withLayout(DigitalGarden)