
import MyHead from './MyHead'

const withLayout = (Page, title) => {
    return () => (

        <>
        <MyHead title={title} />
        <Page />
            <style jsx global>{`

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
main {
    margin:40px auto;
    max-width:900px;
    line-height:1.6;
    font-size:18px;
    color:#444;
    padding:0 10px;
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