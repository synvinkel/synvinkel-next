
import Header from './Header'

const withLayout = (Page, title) => {
    return () => (

        <>
        <Header title={title} />
        <Page />
            <style jsx global>{`
body {
    margin:40px auto;
    max-width:650px;
    line-height:1.6;
    font-size:18px;
    color:#444;
    padding:0 10px
}

h1,h2,h3 {
    line-height:1.2
}
`}
            </style>
        </>
    )
}

export default withLayout